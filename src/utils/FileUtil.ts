import { UploadedFile } from "express-fileupload";
import { join } from "path";
import { promises } from "fs";
import fs from "fs";
import { v4 as uuid } from "uuid";
import { FileWriteException } from "../Types/Errors/Exceptions/FileWriteException";
import { FileReadException } from "../Types/Errors/Exceptions/FileReadException";

//responsible for writing an image buffer to Images Database,
//Returns the image name in the Database.
export const WriteImage = async (file: Buffer): Promise<string> => {
  try {
    //relative directory where all images are stored.
    const RelativePath = "./src/Images";

    //lets get a unique name for the new image we are writing.
    let name = uuid() + ".png";

    //set the new path of the image.
    const path = join(RelativePath, name);

    //write the image using promises and fs module.
    await promises.writeFile(path, file);

    //return the image name.
    return name;
  } catch (e: any) {
    throw new FileWriteException(e.message);
  }
};

export const ReadImage = async (imageName: string) => {
  try {
    //relative directory where all images are stored.
    const RelativePath = "./src/Images";

    //set the new path of the image.
    const Path = join(RelativePath, imageName);

    // return the image file as a buffer
    return fs.readFileSync(Path);
  } catch (e) {
    throw new FileReadException("Image not found");
  }
};
