import { type Socket } from "socket.io";
let GLOBAL_ROOM_ID = 1;
export class RoomManager{
  private rooms: Map<string,Socket[]>
  constructor() {
    this.rooms = new Map<string,Socket[]> //roomid : websocket[]
  }

  generate() {
    return GLOBAL_ROOM_ID++;
  }
  createRoom() {
    const roomId = this.generate().toString();
    this.rooms.set(roomId, []);
    return roomId;
  }
  joinRoom(socket: Socket,roomId:string="1") {
    let room = this.rooms.get(roomId);
    if (!room) {
      this.rooms.set("1", [socket]);
      return;
    }
    room.push(socket)
    socket.emit("roomId",roomId)
  }
  onOffer(payload:any,senderSocketId:string,roomId:string="1") {
    const room = this.rooms.get(roomId);
    if (!room) return;
    console.log("sending socket offer")
    room.forEach(socket => {
      if (socket.id !== senderSocketId) socket.emit("offer",payload)
    })

  }
  onAnswer(payload:any,senderSocketId:string,roomId:string="1") {
    const room = this.rooms.get(roomId);
    if (!room) return;
    console.log("sending socket ans")
    room.forEach(socket => {
      if (socket.id !== senderSocketId) socket.emit("answer",payload)
    })
  }
  onIceCandidates(payload: any, senderSocketId: string,roomId:string="1") {
    const room = this.rooms.get(roomId);
    if (!room) return;
    room.forEach(socket => {
      if (socket.id !== senderSocketId) socket.emit("iceCandidates",payload)
    })
  }
}
