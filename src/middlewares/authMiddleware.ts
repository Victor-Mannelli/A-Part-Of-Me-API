import { NextFunction, Request, Response } from 'express';
import * as repository from '../repositories/userRepository';

export async function validateAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).send({ message: 'Missing authorization header' });
  }
  try {
    const token = header.split(' ')[1];
    const user = await repository.findUserId(token);
    if (user === null) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.locals.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Erro interno do servidor' });
  }
}
