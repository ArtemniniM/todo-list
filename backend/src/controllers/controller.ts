import express from "express";
import { Request, Response } from "express";
import { getData, addTask, updateTask, deleteTask } from "../servicies/service";
import { checkTaskBody, checkTaskId } from "../middlewares/middlewares";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    res.status(200).send(await getData());
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.post("/", checkTaskBody, async (req: Request, res: Response) => {
  try {
    const { title, description, completed, createdAt } = req.body;
    res.status(200).send(await addTask(title, description, completed, createdAt));
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.put("/:id", checkTaskBody, checkTaskId, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, completed, createdAt } = req.body;
    res.status(200).send(await updateTask(id, title, description, completed, createdAt));
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.delete("/:id", checkTaskId, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    res.status(200).send(await deleteTask(id));
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

export default router;
