import { getDataDB, addTaskDB, updateTaskDB, deleteTaskDB } from "../repositories/repository";

const client = { query: jest.fn() };

jest.mock("pg", () => {
  const pool = {
    connect: jest.fn(() => client),
  };
  return {
    Pool: jest.fn(() => pool),
  };
});

describe("test getDataDB", () => {
  test("case #1", async () => {
    client.query.mockResolvedValue({
      rows: [
        {
          title: "Добавить задачу в API",
          description: "Разработать REST API для управления задачами с использованием Node.js и PostgreSQL",
          completed: false,
          createdAt: "2024-01-25T11:30:00.000Z",
        },
      ],
    });

    const res = await getDataDB();

    expect(res).toEqual([
      {
        title: "Добавить задачу в API",
        description: "Разработать REST API для управления задачами с использованием Node.js и PostgreSQL",
        completed: false,
        createdAt: "2024-01-25T11:30:00.000Z",
      },
    ]);
  });
});
describe("test addTaskDB", () => {
  test("case #1", async () => {
    client.query.mockResolvedValue({
      rows: [{ title: "", description: "", completed: true, createdAt: "" }],
    });
    const res = await addTaskDB("", "", true, "");
    expect(client.query).toHaveBeenCalled();
    expect(res).toEqual([{ title: "", description: "", completed: true, createdAt: "" }]);
  });
});
describe("test updateTaskDB", () => {
  test("case #1", async () => {
    client.query.mockResolvedValue({
      rows: [{ title: "", description: "", completed: true, createdAt: "" }],
    });
    const res = await updateTaskDB(1, "", "", true, "");
    expect(client.query).toHaveBeenCalled();
    expect(res).toEqual([{ title: "", description: "", completed: true, createdAt: "" }]);
  });
});
describe("test deleteTaskDB", () => {
  test("1", async () => {
    client.query.mockResolvedValue({
      rows: [{ id: 1, title: "", description: "", completed: true, createdAt: "" }],
    });
    const res = await deleteTaskDB(1);
    expect(client.query).toHaveBeenCalled();
    expect(res).toEqual([{ id: 1, title: "", description: "", completed: true, createdAt: "" }]);
  });
});
