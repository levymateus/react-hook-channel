export const MessageTypes = {
    SUBS: '@@SUBS',
}

export interface ChNotifycation {
    type: string;
}

export interface ChMessage<T> {
    message: T;
}

export interface ChData<T = ChNotifycation | ChMessage<unknown>> {
    props: T;
}

export type Receiver = (data: ChData, from: string) => void;

export type Options = {
    notify?: boolean;
    broadcast?: boolean;
}

export type Node = {
    recv: Receiver;
    options?: Options;
}

export type Sender<T> = (data: ChData, from:string, to:string) => void;

export type Channel = {
    send: Sender<unknown>;
    subs: (key: string, node: Node) => void;
    broadcast: (data: ChData, requester: string) => void;
}