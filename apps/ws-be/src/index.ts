import {WebSocket, WebSocketServer} from 'ws';

const wss = new WebSocketServer({port:8080})

// function validateRawData(raw: any): IncomingSocketData{
//   parseRawData
// }
const parseRaw = (raw:any) => {
  if (typeof raw === "string") {
    return JSON.parse(raw);
  } else {
    return JSON.parse(raw.toString())
  }
}
wss.on("error", () => { });

wss.on("connection", (ws) => {
  console.log("connection")
  ws.on("message", (raw) => {
    console.log("message incoming");
    // const data = validateRawData(raw);
    const data = parseRaw(raw);
    switch (data.type) {
      case "offer":
        console.log("received offer")
      case "answer":
        console.log("received answer")
      case "iceCandidates":
        console.log("ice candidates received")
      default:
        console.log("Default")
    }
  })
})
