import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { join } from "path";
import fs from "fs";
import sharp from "sharp";
import { WriteImage } from "../utils/FileUtil";
import { ApplicationError } from "../Types/Errors/ApplicationError";
import { ReqQuery } from "../Types/ImageControllerTypes";
export const PostImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.files) {
    const result = await WriteImage(req.files["image"] as UploadedFile);
    if (result.isSuccessful) {
      res.status(200).json({});
    } else {
      next(new ApplicationError(400, result.Errors[0]));
    }
  } else {
    next(new ApplicationError(400, "No files provided"));
  }
};

export const EditImage = async (req: Request, res: Response) => {
  const buffer = fs.readFileSync(
    "./src/Data/1c9de0f7dad9016ead059a35abe686aa.png"
  );

  // let waterMark = await fs.promises.readFile(
  //   join("./src/Data", "Sample-Watermark-Transparent.png")
  // );
  // image.composite([
  //   {
  //     input: waterMark,
  //   },
  // ]);

  sharp(buffer)
    .resize(20, 20)
    .toFile("./src/Data/1c9de0f7dad9016ead059a35abe686aa.png", (err) => {
      if (err) console.log(err.message);
    });
  res.status(200).json({});
};

export const DownloadImage = async (req: Request, res: Response) => {
  const { id } = req.params;

  const {
    grayScale,
    cropWidth,
    cropHeight,
    cropLeft,
    cropTop,
    resizeWidth,
    resizeHeight,
    blur,
  } = req.query as ReqQuery;

  try {
    // Read the image file as a buffer
    const filePath = join("./src/Data", id as string);
    const buffer = fs.readFileSync(filePath);

    // Process the image with sharp
    let image = sharp(buffer);
    if (grayScale) {
      image = image.grayscale();
    }

    // Apply resizing if width and/or height are provided
    if (resizeWidth && resizeHeight)
      image.resize(resizeHeight, resizeHeight, {
        fit: "cover",
      });

    if (cropWidth && cropHeight)
      image.extract({
        width: cropWidth,
        height: cropHeight,
        left: cropLeft ?? 0,
        top: cropTop ?? 0,
      });

    if (blur) image.blur(blur);

    const processedImageBuffer = await image.toBuffer();

    // Set the appropriate headers and send the processed image buffer
    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": processedImageBuffer.length,
    });

    res.end(processedImageBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
