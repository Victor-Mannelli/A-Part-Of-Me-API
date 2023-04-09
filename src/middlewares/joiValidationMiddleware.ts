import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';

export function JoiValidationBody(schema: ObjectSchema){
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      console.log(req, 'body');
      res.status(422).send(error.details.map((detail) => detail.message));
      return;
    }
    next();
  };
}
export function JoiValidationParams(schema: ObjectSchema){
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.params, { abortEarly: false });
    if (error) {
      res.status(422).send(error.details.map((detail) => detail.message));
      return;
    }
    next();
  };
}
