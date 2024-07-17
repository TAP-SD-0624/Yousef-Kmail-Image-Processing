import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export function ValidateForQuery(Schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = Schema.validate(req.query);
    if (error) return res.status(400).send(error.message);
    return next();
  };
}

export function ValidateForBody(Schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = Schema.validate(req.body);
    if (error) return res.status(400).send(error.message);
    return next();
  };
}
