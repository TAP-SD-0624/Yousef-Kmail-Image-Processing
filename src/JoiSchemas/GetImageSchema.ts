import Joi from "joi";

export const GetImageSchema = Joi.object({
  grayScale: Joi.bool(),
  cropWidth: Joi.number().positive(),
  cropHeight: Joi.number().positive(),
  cropLeft: Joi.number().positive(),
  cropTop: Joi.number().positive(),
  resizeWidth: Joi.number().positive(),
  resizeHeight: Joi.number().positive(),
  blur: Joi.number().positive(),
});
