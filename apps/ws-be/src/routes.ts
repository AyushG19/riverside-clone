import express ,{ Router } from "express";

const roomRouter: Router = express.Router();

roomRouter.post("/",roomHandler.handleRoot)
