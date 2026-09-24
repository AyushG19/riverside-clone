import { Request, Response } from "express";
import { AppError } from "../error";
import { fetchRoom } from "@repo/db";
import { generateCode } from "../utils/codeGenerator";

export const validateJoinLink = async (req: Request, res: Response) => {
  try {
    const { link } = req.body;
    if (!link) throw new AppError(500, "missing link or code");
    const room = await fetchRoom(link);
    if (room.isValid) res.status(200).json({ message: "link valid" });
    else {
      res.status(400);
    }
  } catch (error: unknown) {
    console.error(error);
  }
};

export const createRoom = async (req: Request, res: Response) => {
  try {
    const code = generateCode();
    res.sendStatus(200).json({message:"Code generation successful",code})
  } catch (error: unknown) {
	console.error(error);
  }
}
