import { Request, Response } from "express";
import { AppError } from "../error";

const validateJoinLink = (req: Request, res: Response): void => {
  try {
  const { link } = req.body;
  if (!link) throw new AppError(500,'missing link or code');
    fetchRoom(link);
  res.status(200).json({message:"link valid"})

  } catch (error: unknown) {
	console.error(error);
  }
}
