import { useEffect, useState } from "react";
import { useWS } from "../webSocketContext";
import "./notification.css";
import x from "./x.png"

const Notif = () => {
  const { message } = useWS() as any;
  const [show,setShow] = useState(true)
  useEffect(()=>{
    if(message){
      setShow(true)
    }
  },[message])
  if (!message || !show) return null;
  return (
    <div
      className={"show"}
      style={{
        display: "flex",
        position: "fixed",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#f1f1f1",
        gap: 8,
        cursor: "pointer",
        padding: 20,
        borderRadius: 8,
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        className="new"
        style={{
          backgroundColor: "red",
          height: 20,
          width: 20,
          borderRadius: "50%",
        }}
      ></div>
      <p style={{ margin: 0, fontWeight: "bold" }}>
        You have new recommendations !
      </p>
      <img src={x} alt="x" onClick={()=>setShow(false)}/>
    </div>
  );
};

export default Notif;
