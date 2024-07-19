import { Router } from "express";
import {
  GetImage,
  EditImage,
  PostImage,
  AddWatermark,
} from "../controllers/ImageController";
import {
  ValidateForBody,
  ValidateForQuery,
} from "../Middlewares/Validations/RequestValidations";

import { GetImageSchema } from "../JoiSchemas/GetImageSchema";
import { EditImageSchema } from "../JoiSchemas/EditImageSchema";
import { ImageProvided } from "../Middlewares/Validations/ImageProvided";

const ImageRouter = Router();

ImageRouter.post(
  "/post",
  ImageProvided([".png"]),
  ValidateForBody(GetImageSchema),
  PostImage
);
ImageRouter.get("/get/:id", ValidateForQuery(GetImageSchema), GetImage);
ImageRouter.post("/edit", ValidateForBody(EditImageSchema), EditImage);
ImageRouter.post("/apply-watermark", ImageProvided([".png"]), AddWatermark);

export default ImageRouter;
