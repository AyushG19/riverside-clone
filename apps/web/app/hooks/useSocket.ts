import { useEffect, useRef } from "react";
import { env } from "../config";

export const useSocket = () => {
  const wsRef = useRef<WebSocket | null>(null);
const pcRef = useRef<RTCPeerConnection|null>(null);

  const connect = () => {
    const wsUrl = `${env.FRONTEND_URL}`
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    const conn = new RTCPeerConnection();
    pcRef.current = conn;

    return wsRef;
  }
  const disconnect = () => {
    if (wsRef.current?.OPEN) {
      wsRef.current.close();
    }
  }

  const handleMessage = async (socketData: any) => {
    if (wsRef.current === null ||
      wsRef.current.readyState === wsRef.current.CLOSED) return;
    if (socketData.type === "offer") {
      if (pcRef.current === null) return;
      const ans = await pcRef.current.createAnswer()
      wsRef.current.send(JSON.stringify({type:"answer",payload:ans}))
      // acceptOffer()
    } else if (socketData.type === "answer") {
      if (pcRef.current === null) return;
      const ans = pcRef.current.createAnswer()
      wsRef.current.send(JSON.stringify({type:"answer",payload:ans}))
      // ackAnser()
    }
  }
  useEffect(() => {
    if (wsRef.current === null ||
      wsRef.current.readyState === wsRef.current.CLOSED) return;

    wsRef.current.onmessage=handleMessage;

    wsRef.current.onerror = () => {
      console.error("error in socket")
    }
  },[wsRef])

return {disconnect,connect}
}
