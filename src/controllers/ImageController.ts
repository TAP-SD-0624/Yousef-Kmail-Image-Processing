import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { join } from "path";
import fs from "fs";
import sharp from "sharp";
import { WriteImage } from "../utils/FileUtil";
import { ApplicationError } from "../Types/Errors/ApplicationError";
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
      next(result.Errors[0]);
    }
  } else {
    next(new ApplicationError(400, "No files provided"));
  }
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

export const DownloadImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
  } = req.query;

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
    const resizeOptions: { width?: number; height?: number } = {};
    if (resizeWidth) {
      resizeOptions.width = parseInt(resizeWidth as string, 10);
    }
    if (resizeHeight) {
      resizeOptions.height = parseInt(resizeHeight as string, 10);
    }

    if (resizeOptions.width && resizeOptions.height)
      image.resize(resizeOptions.width, resizeOptions.height, {
        fit: "cover",
      });

    //Apply Cropping

    const cropOptions: {
      width?: number;
      height?: number;
      top?: number;
      left?: number;
    } = {};

    if (cropWidth) {
      cropOptions.width = parseInt(cropWidth as string, 10);
    }
    if (cropHeight) {
      cropOptions.height = parseInt(cropHeight as string, 10);
    }
    if (cropLeft) {
      cropOptions.left = parseInt(cropLeft as string, 10);
    }
    if (cropTop) {
      cropOptions.top = parseInt(cropTop as string, 10);
    }

    if (cropOptions.width && cropOptions.height)
      image.extract({
        width: cropOptions.width,
        height: cropOptions.height,
        left: cropOptions.left ?? 0,
        top: cropOptions.top ?? 0,
      });
    if (blur) image.blur(parseInt(blur as string));

    let waterMark = await fs.promises.readFile(
      join("./src/Data", "Sample-Watermark-Transparent.png")
    );
    image.composite([
      {
        input: waterMark,
      },
    ]);

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
