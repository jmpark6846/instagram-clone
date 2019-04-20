import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/index";
import { createConnection } from 'typeorm'
import dotenv from 'dotenv'
dotenv.config();

createConnection({
  type:'postgres',
  host:process.env.DB_HOST,
  port:5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entitySchemas: [
      
  ]
})
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use("/", indexRouter);

export default app;
