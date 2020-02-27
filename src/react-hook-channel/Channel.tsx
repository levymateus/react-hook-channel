import React from 'react';
import { Channel as ChannelCtx, ChData, Node, MessageTypes, ChNotifycation } from './constants';

const nodes = new Map<string, Node>();

const send = async (data: ChData, from: string, to: string | string[]) => {
    if(typeof to === 'string') {
        const n = nodes.get(to);
        if(n){
            n.recv(data, from);
            return true;
        }
    }
    if (Array.isArray(to)) {
        transmit((value: Node) => {
            value.recv(data, from);
        });
        return true;
    }
    return false;
}

const newNotification = (type: string): ChData<ChNotifycation> => {
    return {
        props: {
            type
        }
    }
} 

const subs = async (key: string, node: Node) => {
    if (!nodes.get(key)) {
        nodes.set(key, node);
        transmit((value) => {
            notify(
                value, 
                newNotification(MessageTypes.SUBS), 
                key
            );
        });
    }
}

const transmit = async (callback: (node: Node, key: string) => void) => {
    const entries = nodes.entries();
    for(let [key, value] of entries) {
        callback(value, key);
    }
}

const notify = async (node: Node, data: ChData, requester: string) => {
    if (node.options?.notify) {
        node.recv(data, requester);
    }
}

const broadcast = async (data: ChData, requester: string) => {
    transmit((value: Node) => {
       value.recv(data, requester); 
    });
}

const ChannelContext = React.createContext<ChannelCtx>({ send, subs, broadcast });

const Channel: React.FC = ({ children }) => {
    return (
        <ChannelContext.Provider value={ { send, subs, broadcast } }>
            {children}
        </ChannelContext.Provider>
    );
} 

export default Channel;
export { ChannelContext };