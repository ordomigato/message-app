import React, { createContext, useEffect, useState, useCallback } from "react";
import io from "socket.io-client";

export const SocketContext = createContext();

const SocketState = (props) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectSocket = useCallback((bool) => {
    setIsConnected(bool);
  }, []);

  useEffect(() => {
    if (localStorage.token && isConnected === true) {
      setSocket(io.connect("/", { query: { token: localStorage.token } }));
    }
  }, [isConnected]);

  return (
    <SocketContext.Provider value={{ socket, isConnected, connectSocket }}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketState;
