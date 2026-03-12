import { Request, Response, NextFunction } from "express";

function checkTaskBody(req: Request, res: Response, next: NextFunction) {
  const { title, description } = req.body;

  if (typeof title !== "string" || title.trim() === "") throw new Error("Invalid Title Error");

  if (typeof description !== "string" || description.trim() === "") throw new Error("Invalid Description Error");

  next();
}

function checkTaskId(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const num = Number(id);

  if (!Number.isInteger(num) || num <= 0) {
    throw new Error("Invalid Task Id Error");
  }

  next();
}

export { checkTaskBody, checkTaskId };
