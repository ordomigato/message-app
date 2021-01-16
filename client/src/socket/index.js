import React, { createContext, useEffect, useState } from "react";
import io from "socket.io-client";

export const SocketContext = createContext();

const SocketState = (props) => {
  const [socket, setSocket] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  const connectSocket = (bool) => {
    setIsConnected(bool);
  };

  useEffect(() => {
    if (!localStorage.token && !isConnected) return;
    console.log("connecting to socket");
    setSocket(io.connect("/", { query: { token: localStorage.token } }));
  }, [isConnected]);

  return (
    <SocketContext.Provider value={{ socket, isConnected, connectSocket }}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketState;
