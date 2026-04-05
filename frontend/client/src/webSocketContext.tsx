import { createContext, useContext, useEffect, useRef, ReactNode, useState } from "react";
import { AuthContext } from "./AuthContext";

interface WSContextType {
  ws: WebSocket | null;
  message: {
    clicks:string[] | null,
    searches:string[] | null,
  } | null;
}

const WSContext = createContext<WSContextType | null>(null);

export const WSProvider = ({ children }: { children: ReactNode }) => {
  const [ws,setWs] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<{
    clicks:string[] | null,
    searches:string[] | null,
    purchases:string[] | null,
  } | null>(null);
  
  const {id} = useContext(AuthContext) as any

  useEffect(() => {
    if(!id) return;
    

    const socket = new WebSocket("ws://localhost:4000");

    socket.onopen = () => {
      socket.send(JSON.stringify({ clientId:id,eventType: "connection" }))
      
    };
    socket.onmessage = (event)=>{
        console.log("Received message:", event.data);
        if(JSON.parse(event.data)){
          const data = JSON.parse(event.data);
          setMessage(data);
        }
      }
    
    socket.onclose = () => console.log("Disconnected");
    setWs(socket)
    return () => {
      socket?.close();
    };
  }, [id]);

  return (
    <WSContext.Provider value={{ws,message}}>
      {children}
    </WSContext.Provider>
  );
};

export const useWS = () => useContext(WSContext) as WSContextType | null;