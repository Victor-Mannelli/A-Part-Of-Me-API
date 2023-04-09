import './setup';
import express, { json } from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { handleApplicationErrors } from './middlewares';
import { messageRouter, userRouter } from './routers';

const app = express();
const serverHttp = http.createServer(app);
const io = new Server(serverHttp, {
  cors: { origin: 'http://localhost:3000' },
});

app
  .use(cors())
  .use(json())
  .use(messageRouter)
  .use(userRouter)
  .use(handleApplicationErrors);

export { serverHttp, io, app };
