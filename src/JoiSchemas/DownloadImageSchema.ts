import Joi from "joi";

export const GetImageSchema = Joi.object({
  grayScale: Joi.bool(),
  cropWidth: Joi.number(),
  cropHeight: Joi.number(),
  cropLeft: Joi.number(),
  cropTop: Joi.number(),
  resizeWidth: Joi.number(),
  resizeHeight: Joi.number(),
  blur: Joi.number(),
});
