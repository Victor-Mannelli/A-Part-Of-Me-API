// eslint-disable-next-line prettier/prettier
import { Injectable, NestMiddleware, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { prisma } from 'src/utils/prisma';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req, res, next: () => void) {
    const token: string = req.headers.authorization?.replace('Bearer ', '');
    if (!token) throw new UnauthorizedException();

    jwt.verify(token, process.env.JWT_SECRET || '', (err) => {
      if (err) throw new UnauthorizedException();
    });

    const jwtPayload: jwt.JwtPayload = jwt.decode(token, {
      json: true,
    }) as jwt.JwtPayload;

    const user = await prisma.user.findFirst({
      where: {
        user_id: jwtPayload.user_id,
      },
    });
    if (!user) throw new NotAcceptableException();

    res.locals.user_id = jwtPayload.user_id;
    next();
  }
}
