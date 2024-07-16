import Joi from "joi";
import { GetImageSchema } from "./GetImageSchema";

export const EditImageSchema = GetImageSchema.keys({
  name: Joi.string().required(),
});
