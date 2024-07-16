import { UploadedFile } from "express-fileupload";
import { join } from "path";
import { promises } from "fs";
import { ErrorOr } from "../Types/ErrorOr";
export const WriteImage = async (
  file: UploadedFile,
  override: boolean = true
): Promise<ErrorOr<string>> => {
  const value = new ErrorOr<string>();
  try {
    const path = join("./src/Data", file.name);
    await promises.writeFile(path, file.data);
    value.result = path;
    return value;
  } catch (e: any) {
    const value = new ErrorOr<string>();
    value.isSuccessful = false;
    value.Errors.push(e.message);
  } finally {
    return value;
  }
};
