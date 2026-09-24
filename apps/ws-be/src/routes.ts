import express ,{ Router } from "express";
import { createRoom, validateJoinLink } from "./controllers/room.controller";

const roomRouter: Router = express.Router();

// roomRouter.post("/",roomHandler.handleRoot)
roomRouter.put("/upload-url");
roomRouter.post("/validate-link", validateJoinLink);
roomRouter.post("/create",createRoom)

export {roomRouter}
