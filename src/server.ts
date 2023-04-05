import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import './setup';
import userRouter from './routers/userRouter';
// import { channelRouter } from './routes/channelRouter.js';
// import { messageRouter } from './routes/messageRouter/messageRouter.js';

const app = express();
const serverHttp = http.createServer(app);
const io = new Server(serverHttp, {
  cors: { origin: 'http://localhost:3000' },
});

app
  .use(cors())
  .use(express.json())
  .use(userRouter);
// .use(channelRouter)
// .use(messageRouter);

export { serverHttp, io };
