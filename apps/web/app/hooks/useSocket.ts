import { useEffect, useRef } from "react";
import { env } from "../config";
import { io, Socket } from "socket.io-client";

export const useSocket = (
  videoRef: React.RefObject<HTMLVideoElement | null>,
  recVideoRef: React.RefObject<HTMLVideoElement | null>,
) => {
  const wsRef = useRef<Socket | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const roomId = useRef<string | null>(null);

  const sendOffer = async () => {
    try {

    const pc = pcRef.current ?? createPc();
    await startVideo();

    if (pc.signalingState !== "stable") {
      console.log("Cannot create offer, signalling state:", pc.signalingState);
      return;
    }
    const offer = await pc.createOffer();
    pc.setLocalDescription(offer);
    wsRef.current?.emit("offer", offer);
    } catch (err) {
      console.error("Error sending offer:", err);
    }
  };
  const createPc = () => {
    const pc = new RTCPeerConnection();
    pcRef.current = pc;

    pc.onicecandidate = (event) => {
      if (wsRef.current) wsRef.current.emit("iceCandidates", event.candidate);
    };
    pc.ontrack = (event) => {
      const video = recVideoRef.current;
      if (!video) return;

      const [incomingStream] = event.streams;
      if (!incomingStream) return;

      // Only (re)assign if it's actually a different stream
      if (video.srcObject !== incomingStream) {
        video.srcObject = incomingStream;
        video.playsInline = true;

        video.play().catch((err) => {
          if (err.name !== "AbortError") {
            console.error("Remote video play error:", err);
          }
          // AbortError here is expected/harmless if a newer load superseded this one
        });
      }
    };
    return pc;
  };
  const joinRoom = () => {
    console.log("joinRoom outside");
    if (wsRef.current) {
      console.log("inside joinRoom if");
      wsRef.current.emit("joinRoom");
    }
  };
  const connect = async() => {
    const wsUrl = env.FRONTEND_URL;
    const ws = io(wsUrl);
    wsRef.current = ws;

    ws.on("connect", () => console.log("Socket Connected:", ws.id))

    ws.on("offer", async (offer) => {
      try {
      console.log("Offer Received:", offer);
        const pc = pcRef.current ?? createPc();
        await startVideo()
        await pc.setRemoteDescription(offer);
        const ans = await pc.createAnswer();
        await pc.setLocalDescription(ans);
        ws.emit("answer", pc.localDescription);
      } catch (err) {
        console.error("Offer handling error:", err);
      }
    });

    ws.on("answer", async (answer) => {
      try {
      console.log("Answer Received:",answer);
        const pc = pcRef.current;
        if (!pc) {
          console.log("No Peerconnection");
          return;
        }
      await pc.setRemoteDescription(answer);

      }
      catch (err) {
        console.error("Error handling answer:", err);
      }
    });

    wsRef.current.on("iceCandidates", async (candidates) => {
      try {
        console.log("Candidate Received:", candidates);
        const pc = pcRef.current;
        if (!pc || !pc.remoteDescription) {
          console.log("No remote desc");
          return;
        }
      await pc.addIceCandidate(candidates);
      } catch (err) {
        console.error("Error handling ice candidates:", err);
      }
    });
    return wsRef;
  };

  const startVideo = async () => {
    try {

    const localStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true,
    });

    if (videoRef.current) {
      videoRef.current.srcObject = localStream;
      videoRef.current.play();
    }

    localStream.getTracks().forEach((track) => {
      pcRef.current?.addTrack(track, localStream);
    });
    } catch (err) {
      console.log("Error handling startVid:",err)
    }
  };
  const disconnect = () => {
    if (wsRef.current?.connected) {
      wsRef.current.disconnect();
    }
  };

  useEffect(() => {
    if (wsRef.current === null || wsRef.current.disconnected) return;
    // wsRef.current.on("message", handleMessage);

    wsRef.current.on("error", () => console.log("error"));
  }, [wsRef]);

  return { disconnect, connect, joinRoom, sendOffer, pcRef };
};
