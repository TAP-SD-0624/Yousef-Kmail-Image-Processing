import { NextFunction, Request, Response } from "express";
import { ApplicationError } from "../Types/Errors/ApplicationError";

export const GobalErrorHandling = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ApplicationError) {
    const AppError = error as ApplicationError;
    res.status(AppError.statusCode).json({ error: error.message });
  } else {
    res.status(500).json({ error: "Unexpected error occured" });
  }
};
