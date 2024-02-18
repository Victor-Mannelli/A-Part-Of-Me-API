import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import { prisma } from 'src/utils';
@Injectable()
export class UserMiddleware implements NestMiddleware {
  prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }
  async use(req: any, res: any, next: () => void) {
    // const token: string = req.headers.authorization?.replace('Bearer ', '');
    // if (!token) throw new UnauthorizedException();
    // jwt.verify(token, process.env.API_SECRET || '', (err) => {
    //   if (err) throw new UnauthorizedException();
    // });
    // const session = await this.prisma.sessions.findFirst({
    //   where: { token },
    // });
    // const user: any = jwt.decode(token);
    // if (!session) throw new UnauthorizedException();
    // res.locals.user = { ...user, token };
    next();
  }
}
