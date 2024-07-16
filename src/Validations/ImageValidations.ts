import { NextFunction, Request, Response } from "express";
import { GetImageSchema } from "../JoiSchemas/DownloadImageSchema";

export const GetImageValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = GetImageSchema.validate(req.query);
  if (error) return res.status(400).send(error.message);
  next();
};
