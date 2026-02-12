import { getDataDB, addTaskDB, updateTaskDB, deleteTaskDB } from "../repositories/repository";
import { iTask } from "../interfaces";

async function getData(): Promise<iTask[]> {
  const result: iTask[] = await getDataDB();
  if (!result.length) throw new Error("Empty task");
  return result;
}
async function addTask(title: string, description: string, completed: boolean, createdAt: string): Promise<iTask[]> {
  const result: iTask[] = await addTaskDB(title, description, completed, createdAt);
  if (!result.length) throw new Error("Empty task");
  return result;
}
async function updateTask(
  id: number,
  title: string,
  description: string,
  completed: boolean,
  createdAt: string
): Promise<iTask[]> {
  const result: iTask[] = await updateTaskDB(id, title, description, completed, createdAt);
  if (!result.length) throw new Error("id doesnt exist");
  return result;
}
async function deleteTask(id: number): Promise<iTask[]> {
  const result: iTask[] = await deleteTaskDB(id);
  if (!result.length) throw new Error("id doesnt exist");
  return result;
}

export { getData, addTask, updateTask, deleteTask };
