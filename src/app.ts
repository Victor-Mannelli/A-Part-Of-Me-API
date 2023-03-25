import express, { json } from "express";
import cors from "cors";
import Routers from "./routers";

const app = express();

app.use(cors());
app.use(json());
app.use(Routers);

export default app;
