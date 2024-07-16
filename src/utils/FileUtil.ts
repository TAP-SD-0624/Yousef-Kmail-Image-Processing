import { UploadedFile } from "express-fileupload";
import { join } from "path";
import { promises } from "fs";
import { ErrorOr } from "../Types/ErrorOr";
export const WriteImage = async (
  file: UploadedFile,
  override: boolean = true
): Promise<ErrorOr<string>> => {
  try {
    const path = join("./src/Data", file.name);
    await promises.writeFile(path, file.data);
    const value = new ErrorOr<string>();

    value.result = path;
  } catch (e: any) {
    const value = new ErrorOr<string>();
    value.isSuccessful = false;
    value.Errors.push(e.message);
    return value;
  }
  return new ErrorOr<string>();
};
