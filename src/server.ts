import express from 'express';
import cors from 'cors';
import http from 'http';
import Routers from './routers/routers';
import { Server } from 'socket.io';
import './setup';

const app = express();
const serverHttp = http.createServer(app);
const io = new Server(serverHttp, {
  cors: { origin: 'http://localhost:3000' },
});

app
  .use(cors())
  .use(express.json())
  .use(Routers);

export { serverHttp, io, app };
