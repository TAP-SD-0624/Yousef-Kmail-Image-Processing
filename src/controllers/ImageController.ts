import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import sharp from "sharp";
import { ReadImage, WriteImage } from "../utils/FileUtil";
import { ApplicationError } from "../Types/Errors/ApplicationError";
import { ImageProcessingAttributes } from "../Types/ImageControllerTypes";
import { ApplyChangesToSharpImage } from "../utils/SharpUtils";
import { FileWriteException } from "../Types/Errors/Exceptions/FileWriteException";
import { FileReadException } from "../Types/Errors/Exceptions/FileReadException";
import { SharpChangesException } from "../Types/Errors/Exceptions/SharpChangesException";
import { GetImageSchema } from "../JoiSchemas/GetImageSchema";
import { EditImageSchema } from "../JoiSchemas/EditImageSchema";

//posting a new image to the images directory.
export const PostImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //reading the body properties to apply to the image.
  const { value } = GetImageSchema.validate(req.body);

  try {
    if (req.files) {
      //getting the file "image" from the form data of the request.
      let image = sharp((req.files["image"] as UploadedFile).data);

      //lets apply all of those changes to the image.
      image = ApplyChangesToSharpImage(image, value);

      //convert the sharp image to buffer and write it to the directory.
      const dataBuffer = await image.toBuffer();
      const result = await WriteImage(dataBuffer);
      res.status(200).json({ name: result });
    }
  } catch (e) {
    //mapping all possible errors to network errors.
    if (e instanceof SharpChangesException) {
      return next(new ApplicationError(400, e.message));
    } else if (e instanceof FileWriteException) {
      return next(new ApplicationError(500, e.message));
    }
  }
};

export const EditImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { value } = EditImageSchema.validate(req.body);

  const { name, ...rest } = value;
  try {
    let buffer = await ReadImage(name);

    let image = sharp(buffer);
    image = ApplyChangesToSharpImage(image, rest);
    buffer = await image.toBuffer();
    let result = await WriteImage(buffer);

    return res.status(200).json({ name: result });
  } catch (e) {
    //mapping all possible errors to network errors.
    if (e instanceof FileReadException) {
      return next(
        new ApplicationError(404, "image with the provided name not found")
      );
    } else if (e instanceof FileWriteException) {
      return next(new ApplicationError(500, e.message));
    } else if (e instanceof SharpChangesException) {
      return next(new ApplicationError(400, e.message));
    }
    next(e);
  }
};

export const AddWatermark = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    if (req.files) {
      let waterMark = (req.files["waterMark"] as UploadedFile).data;
      const image = sharp(await ReadImage(name));

      image.composite([
        {
          input: waterMark,
        },
      ]);
      const path = await WriteImage(await image.toBuffer());
      res.status(200).json({ name: path });
    }
  } catch (e) {
    if (e instanceof FileReadException) {
      return next(
        new ApplicationError(404, "image with the provided name not found")
      );
    } else if (e instanceof FileWriteException) {
      return next(new ApplicationError(500, "An unhandled error occured"));
    }
    return next(e);
  }
};

export const GetImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const { value } = GetImageSchema.validate(req.query);

  try {
    let buffer = await ReadImage(id);
    // Process the image with sharp
    let image = sharp(buffer);

    image = ApplyChangesToSharpImage(image, value);
    const processedImageBuffer = await image.toBuffer();
    console.log(value);
    // Set the appropriate headers and send the processed image buffer
    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": processedImageBuffer.length,
    });

    res.end(processedImageBuffer);
  } catch (e) {
    //mapping all possible errors to network errors.
    if (e instanceof FileReadException) {
      return next(
        new ApplicationError(404, "image with the provided id not found")
      );
    } else if (e instanceof SharpChangesException) {
      return next(new ApplicationError(400, e.message));
    }
  }
};
