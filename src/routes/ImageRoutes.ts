import { Router } from "express";
import {
  DownloadImage,
  EditImage,
  PostImage,
} from "../controllers/ImageController";
import { GetImageValidation } from "../Validations/ImageValidations";

const ImageRouter = Router();

ImageRouter.post("/post", PostImage);
ImageRouter.get("/get/:id", GetImageValidation, DownloadImage);
ImageRouter.post("/edit", EditImage);

export default ImageRouter;
