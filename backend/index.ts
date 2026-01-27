import express from "express";
import { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import controller from "./src/controllers/controller";
import cors from "cors";

const app = express();

app.use(cors());
app.use("/", bodyParser.json());
app.use("/tasks", controller);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send(err.message);
});

app.listen(3000, () => {
  console.log("ready!");
});
