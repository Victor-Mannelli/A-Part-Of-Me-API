import { Router } from 'express';
import userRouter from './userRouter';

const Routers = Router();

Routers.use(userRouter);

export default Routers;
