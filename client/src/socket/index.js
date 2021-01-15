import React, { createContext } from "react";
import io from "socket.io-client";

export const SocketContext = createContext();

const SocketState = (props) => {
  const socket = io.connect("/", { query: { token: localStorage.token } });

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketState;
