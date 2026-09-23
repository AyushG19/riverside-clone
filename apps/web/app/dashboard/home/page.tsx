"use client";
import { useRef, useState } from "react";
import { useSocket } from "../../hooks/useSocket";
import ButtonCard from "./buttonCard";
import CallDialog from "./callDialog";
import { Presentation } from "lucide-react";
export default function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const recVideoRef = useRef<HTMLVideoElement | null>(null);
  const { connect, joinRoom, sendOffer } = useSocket(videoRef, recVideoRef);
  const [perms, setPerms] = useState({ video: true, audio: true });
  const createRoom = () => {
    const localStream = navigator.mediaDevices.getUserMedia({ video: perms.video, audio: perms.audio });
  }

  const toggleVideo = () => {
    setPerms((prev)=>({ ...prev, video: !prev.video }));
  }

  const toggleAudio = () => {
    setPerms((prev)=>({ ...prev, audio: !prev.audio }));
  }

  return (
    <div>
      <button className="border bg-amber-300" onClick={connect}>
        connect
      </button>

      <button className="bg-amber-900" onClick={joinRoom}>
        join room
      </button>
      <button className="bg-amber-200" onClick={sendOffer}>
        send offer
      </button>
      <div className="flex gap-4">
        <CallDialog />
        <ButtonCard
          onClick={createRoom}
          icon={Presentation}
          title="organise"
          desc="Make a new room"
        />
      </div>
      <video ref={videoRef}></video>
      <video ref={recVideoRef}></video>
    </div>
  );
}
