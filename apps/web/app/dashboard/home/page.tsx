"use client"
import { useSocket } from "../../hooks/useSocket"
export default function Home() {
  const { connect } = useSocket();
  const test =  async() => {
    const conn = new RTCPeerConnection();
    const offer = await conn.createOffer();
    const answer = await conn.createAnswer()
    console.log(offer,answer);
    // return offer;
  }
  return (
    <div>
      <button
        className="border"
        onClick={test}>Record</button>
      <button
        className="border bg-amber-300"
        onClick={connect}>Host</button>
    </div>
  )
}
