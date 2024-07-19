import { Sharp } from "sharp";
import { ImageProcessingAttributes } from "../Types/ImageControllerTypes";
import { SharpChangesException } from "../Types/Errors/Exceptions/SharpChangesException";

export const ApplyChangesToSharpImage = (
  image: Sharp,
  {
    blur,
    cropHeight,
    cropLeft,
    cropTop,
    cropWidth,
    grayScale,
    resizeHeight,
    resizeWidth,
  }: ImageProcessingAttributes
) => {
  if (grayScale) {
    image = image.grayscale();
  }
  try {
    // Apply resizing if width and height are provided
    if (resizeWidth && resizeHeight)
      image.resize(resizeHeight, resizeHeight, {
        fit: "cover",
      });

    //Apply cropping of width and height are provided.
    //Set the left and top to defaul 0.
    if (cropWidth && cropHeight)
      image.extract({
        width: cropWidth,
        height: cropHeight,
        left: cropLeft ?? 0,
        top: cropTop ?? 0,
      });
  } catch (e: any) {
    throw new SharpChangesException(e.message);
  }

  //Applying blur.
  if (blur) image.blur(blur);

  return image;
};
