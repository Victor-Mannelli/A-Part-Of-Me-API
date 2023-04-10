import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';

export function JoiValidation(schema: ObjectSchema, type: 'body' | 'params' | 'query' ){
  return (req: Request, res: Response, next: NextFunction) => {
    if (type === 'body') {
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        console.log(req, 'body');
        res.status(422).send(error.details.map((detail) => detail.message));
        return;
      }
    }
    if (type === 'params') {
      const { error } = schema.validate(req.params, { abortEarly: false });
      if (error) {
        res.status(422).send(error.details.map((detail) => detail.message));
        return;
      }
    }
    if (type === 'query') {
      const { error } = schema.validate(req.query, { abortEarly: false });
      if (error) {
        res.status(422).send(error.details.map((detail) => detail.message));
        return;
      }
    }
    next();
  };
}
