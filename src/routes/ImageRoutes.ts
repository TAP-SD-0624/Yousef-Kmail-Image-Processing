import { Router } from "express";
import {
  DownloadImage,
  EditImage,
  PostImage,
} from "../controllers/ImageController";

const ImageRouter = Router();

ImageRouter.post("/post", PostImage);
ImageRouter.get("/get/:id", DownloadImage);
ImageRouter.post("/edit", EditImage);

export default ImageRouter;
