import './setup';
import express, { json, Express } from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { handleApplicationErrors } from './middlewares';
import { animeRouter, authRouter, friendRouter, messageRouter, userRouter } from './routers';
import { connectDb, disconnectDB } from './config/database';

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
  .use('/friends', friendRouter)
  .use('/anime', animeRouter)
  .use(authRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export { serverHttp, io, app };
