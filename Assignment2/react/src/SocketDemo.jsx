import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const API_ENDPOINT = 'http://localhost:3001';
function SocketDemo() {
  const [response, setResponse] = useState('');
  const [socket, setSocket] = useState(null);
  const socketConnect = () => {
    setSocket(socketIOClient(API_ENDPOINT));
  };
  const socketDisconnect = () => {
    socket.disconnect();
  };
  const connectSocketConnection = () => {
    if (socket != null) {
      socket.on('GetTime', (data) => {
        setResponse(data);
        console.log(data);
      });
    }
  };

  useEffect(() => {
    socketConnect();
    const destructFunction = () => {
      socketDisconnect();
    };
    return destructFunction;
  }, []);
  useEffect(() => {
    connectSocketConnection();
  }, [socket]);
  return (
    <div className="mx-auto mt-3 p-3 w-50 bg-primary text-center">
      <h1 className="m-2">{response}</h1>
      <button
        className="m-2 btn-success btn"
        type="button"
        onClick={socketConnect}
      >
        {' '}
        Connect{' '}
      </button>
      <button
        className="m-2 btn-danger btn"
        type="button"
        onClick={socketDisconnect}
      >
        {' '}
        Disconnect{' '}
      </button>
    </div>
  );
}
export default SocketDemo;
