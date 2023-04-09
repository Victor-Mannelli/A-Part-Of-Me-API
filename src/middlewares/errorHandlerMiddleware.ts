import { Request, Response } from 'express';
import { ApplicationError } from '../utils/types';
import httpStatus from 'http-status';

export class CustomError extends Error {
  status: number;
  constructor({ status, message } : { status: number, message: string}) {
    super(message);
    this.status = status;
  }
}

export function handleApplicationErrors(err: ApplicationError, _req: Request, res: Response) {
  console.error(err); 
  res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR).send({ 
    error: {
      message: err.message || 'An unknown error occurred'
    }
  });
}
