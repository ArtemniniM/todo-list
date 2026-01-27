import pool from "./db";
import { iTask } from "../interfaces/index";

async function getDataDB(): Promise<iTask[]> {
  const client = await pool.connect();

  try {
    const sql = "SELECT * FROM tasks";
    const result = await client.query(sql);
    return result.rows;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

async function addTaskDB(title: string, description: string, completed: boolean, createdAt: string): Promise<iTask[]> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const sql = "INSERT INTO tasks (title, description, completed, createdAt) VALUES ( $1, $2, $3, $4) RETURNING *";
    const result = await client.query(sql, [title, description, completed, createdAt]);

    await client.query("COMMIT");

    return result.rows;
  } catch (error: any) {
    await client.query("ROLLBACK");

    throw new Error(error.message);
  }
}

async function updateTaskDB(
  id: number,
  title: string,
  description: string,
  completed: boolean,
  createdAt: string
): Promise<iTask[]> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const sql = "UPDATE tasks SET title= $1,description = $2,completed = $3,createdAt = $4 WHERE id = $5 RETURNING *";
    const result = await client.query(sql, [title, description, completed, createdAt, id]);

    await client.query("COMMIT");

    return result.rows;
  } catch (error: any) {
    await client.query("ROLLBACK");

    throw new Error(error.message);
  }
}

async function deleteTaskDB(id: number): Promise<iTask[]> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const sql = "DELETE FROM tasks WHERE id = $1 RETURNING *";
    const result = await client.query(sql, [id]);

    await client.query("COMMIT");

    return result.rows;
  } catch (error: any) {
    await client.query("ROLLBACK");

    throw new Error(error.message);
  }
}
export { getDataDB, addTaskDB, updateTaskDB, deleteTaskDB };
