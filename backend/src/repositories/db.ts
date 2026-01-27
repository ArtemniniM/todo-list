import { Pool } from "pg";

const pool = new Pool({
  password: "12345678",
  database: "todo-list",
  port: 5432,
  host: "localhost",
  user: "postgres",
});

export default pool;
