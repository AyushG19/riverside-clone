import { DefaultEventsMap, Server, Socket, } from "socket.io";
import { RoomManager } from "./managers/room.manager";
import express from 'express'
import http from "http"
import { roomRouter } from "./routes";
const app = express()

const server = http.createServer(app);
// const server = http.createServer()
app.use(roomRouter);
const io = new Server(server,{cors:{origin:"*"}})
const roomManager = new RoomManager();

// function validateRawData(raw: any): IncomingSocketData{
//   parseRawData
// }
let offerer: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> | null = null;
let answerer: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>|null=null ;

const parseRaw = (raw:any) => {
  if (typeof raw === "string") {
    return JSON.parse(raw);
  } else {
    return JSON.parse(raw.toString())
  }
}

io.on("connection", (ws) => {
  console.log("connection")
  ws.on("offer",(payload)=> {
    roomManager.onOffer(payload, ws.id)
  })
  ws.on("answer",(payload)=> {
    roomManager.onAnswer(payload, ws.id)
  })
  ws.on("joinRoom",(payload)=> {
    roomManager.joinRoom(ws)
  })
  ws.on("message", (raw) => {
    console.log("message incoming");
    // const data = validateRawData(raw);
    const data = parseRaw(raw);
    switch (data.type) {
      case "joinRoom":
        roomManager.joinRoom(ws)
        break;
      case "offer":
        roomManager.onOffer(data.payload, ws.id)
        console.log("received offer");
        offerer = ws;
        break;
      case "answer":
        console.log("received answer")
        roomManager.onAnswer(data.payload, ws.id);
        answerer = ws;
        break;
      case "iceCandidates":
        console.log("ice candidates received")
        roomManager.onIceCandidates(data.payload,ws.id)
        break;
      default:
        console.log("Default")
    }
  })
})
server.listen(8080, () => {
  console.log("Server running on port 8080");
});
