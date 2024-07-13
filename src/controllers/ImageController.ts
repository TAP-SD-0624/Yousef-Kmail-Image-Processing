import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { join } from "path";
import fs from "fs";
import sharp from "sharp";

export const PostImage = async (req: Request, res: Response) => {
  if (req.files) {
    for (const [key, value] of Object.entries(req.files)) {
      fs.writeFile(
        join("./src/Data", (value as UploadedFile).name),
        (value as UploadedFile).data,
        (err) => {
          console.log(err?.message);
        }
      );
    }
  }
  res.status(200).json({});
};

export const EditImage = async (req: Request, res: Response) => {
  const buffer = fs.readFileSync(
    "./src/Data/1c9de0f7dad9016ead059a35abe686aa.png"
  );
  sharp(buffer)
    .resize(20, 20)
    .toFile("./src/Data/1c9de0f7dad9016ead059a35abe686aa.png", (err) => {
      if (err) console.log(err.message);
    });
  res.status(200).json({});
};

export const DownloadImage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const path = join("./src/Data", id as string);
  res.download(path);
};
