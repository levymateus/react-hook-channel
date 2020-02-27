import React, { useEffect, useState } from 'react';
import Channel from '../react-hook-channel/Channel';
import useChannel from '../react-hook-channel/useChannel';
import { ChData, ChNotifycation, ChMessage } from '../react-hook-channel/constants';

const Simple = () => {
  return (
    <Channel>
      <ComponentA name="ComponentA">
      </ComponentA>
      <ComponentB name="ComponentB">
      </ComponentB>
        <ComponentA name="SubComponentA">
        </ComponentA>
        <ComponentB name="SubComponentB">
        </ComponentB>
    </Channel>
  );
}

const ComponentA: React.FC<{ name: string }> = ({ children, name }) => {

  const [message, setMessage] = useState('');

  const recv = (data: ChData, from: string): void => {
    const { message } = (data.props as ChMessage<string>);
    const { type } = (data.props as ChNotifycation);
    if (message) {
      setMessage(`${name} receive message ${message} from ${from}`);
    }
    if(type) {
        send({ props: { message: 'HelloB' } }, name, 'ComponentB');
        send({ props: { message: 'HelloB' } }, name, 'SubComponentB');
    }
  }

  const { send } = useChannel('ComponentA', recv, { notify: true });

  useEffect(() => {
    send({ props: { message: 'HelloB' } }, name, 'ComponentB');
  }, [send, name]);
  
  return <div>{message}</div>
}

const ComponentB: React.FC<{ name: string }> = ({ children, name }) => {

  const [ message, setMessage] = useState('');

  const recv = (data: ChData, from: string): void => {
    const { message } = (data.props as ChMessage<string>);
    const { type } = (data.props as ChNotifycation);
    if(message) {
      setMessage(`${name} receive message ${message} from ${from}`);
    }
    if(type) {
      send({ props: { message: 'HelloA' } }, name, 'ComponentA');
      send({ props: { message: 'HelloB' } }, name, 'SubComponentA');
  }
  }

  const { send } = useChannel('ComponentB', recv);
  
  useEffect(() => {
    send({ props: { message: 'HelloA' } }, name, 'ComponentA');
  }, [send, name]);
  
  return <div>{message}</div>
}

export default Simple;
