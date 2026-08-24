import {WebSocket, WebSocketServer} from 'ws';

const wss = new WebSocketServer({port:8080})

function validateRawData(raw: any): IncomingSocketData{
  parseRawData
}
wss.on("error", () => { });

wss.on("connection", (ws) => {
  console.log("connection")
  ws.on("message", (raw) => {
    console.log("message incoming");
    const data = validateRawData(raw);
    switch (data.type) {
      case "offer":
      case "answer":
      case "iceCandidates":
      default
    }
  })
})
