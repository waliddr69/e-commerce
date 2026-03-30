import { createContext, useContext, useEffect, useRef, ReactNode, useState } from "react";

const WSContext = createContext<WebSocket | null>(null);

export const WSProvider = ({ children }: { children: ReactNode }) => {
  const [ws,setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");

    socket.onopen = () => console.log("Connected");
    socket.onclose = () => console.log("Disconnected");
    setWs(socket)
    return () => {
      socket?.close();
    };
  }, []);

  return (
    <WSContext.Provider value={ws}>
      {children}
    </WSContext.Provider>
  );
};

export const useWS = () => useContext(WSContext);