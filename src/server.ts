import './setup';
import express, { json } from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { handleApplicationErrors } from './middlewares';
import { authRouter, friendRouter, messageRouter, userRouter } from './routers';

const app = express();
const serverHttp = http.createServer(app);
const io = new Server(serverHttp, {
  cors: { origin: 'http://localhost:3000' },
});

app
  .use(cors())
  .use(json())
  .use('/users', userRouter)
  .use('/messages', messageRouter)
  .use(friendRouter)
  .use(authRouter)
  .use(handleApplicationErrors);

export { serverHttp, io, app };
