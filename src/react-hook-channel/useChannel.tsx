import { useContext, useEffect } from "react";
import {ChannelContext} from "./Channel";
import { Receiver, Options } from "./constants";

function useChannel (key: string, recv: Receiver, options?: Options) {
    const { send, subs, broadcast } = useContext(ChannelContext);
    useEffect(() => {
        subs(key, { recv, options: { ...options } });
    }, [key, recv, subs, options]);
    return { send, broadcast }
}

export default useChannel;