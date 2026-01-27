import { Request, Response, NextFunction } from "express";

function checkTaskBody(req: Request, res: Response, next: NextFunction) {
  const { title, description, completed, createdAt } = req.body;

  if (typeof title !== "string" || title.trim() === "") throw new Error("Invalid Title Error");

  if (typeof description !== "string" || description.trim() === "") throw new Error("Invalid Description Error");

  if (typeof completed !== "boolean") throw new Error("Completed Must Be Boolean Error");

  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

  if (typeof createdAt !== "string" || !dateRegex.test(createdAt)) throw new Error("Invalid Created At Format Error");

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
