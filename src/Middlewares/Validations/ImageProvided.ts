import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import path from "path";
export const ImageProvided = (types: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.files) return res.status(400).send("No files were provided");

    for (const obj in req.files) {
      if (
        !types.includes(path.extname((req.files[obj] as UploadedFile).name))
      ) {
        return res.status(400).send("Unsupported file type were sent");
      }
    }
    return next();
  };
};
