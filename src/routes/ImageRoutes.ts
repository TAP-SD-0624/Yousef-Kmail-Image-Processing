import { Router } from "express";
import {
  DownloadImage,
  EditImage,
  PostImage,
} from "../controllers/ImageController";
import {
  ValidateForBody,
  ValidateForQuery,
} from "../Validations/RequestValidations";

import { GetImageSchema } from "../JoiSchemas/GetImageSchema";
import { EditImageSchema } from "../JoiSchemas/EditImageSchema";

const ImageRouter = Router();

ImageRouter.post("/post", PostImage);
ImageRouter.get("/get/:id", ValidateForQuery(GetImageSchema), DownloadImage);
ImageRouter.post("/edit", ValidateForBody(EditImageSchema), EditImage);

export default ImageRouter;
