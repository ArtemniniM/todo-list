import { getData, addTask, updateTask, deleteTask } from "../services/service";
import * as repositories from "../repositories/repository";

describe("getDataTest", () => {
  test("getDataTest sucsess", async () => {
    const mock = jest.spyOn(repositories, "getDataDB");
    mock.mockResolvedValue([
      {
        id: 1,
        title: "Добавить задачу в API",
        description: "Разработать REST API для управления задачами с использованием Node.js и PostgreSQL",
        completed: false,
        createdAt: "2024-01-25T11:30:00.000Z",
      },
    ]);

    const res = await getData();
    expect(mock).toHaveBeenCalled();
    expect(res).toEqual([
      {
        id: 1,
        title: "Добавить задачу в API",
        description: "Разработать REST API для управления задачами с использованием Node.js и PostgreSQL",
        completed: false,
        createdAt: "2024-01-25T11:30:00.000Z",
      },
    ]);
  });
  test("getDataTest error", async () => {
    const mock = jest.spyOn(repositories, "getDataDB");
    mock.mockResolvedValue([]);
    try {
      await getData();
    } catch (error: any) {
      expect(mock).toHaveBeenCalled();
      expect(error.message).toBe("Empty task");
    }
  });
});
describe("postTaskTest", () => {
  test("postTaskTest sucsess", async () => {
    const mock = jest.spyOn(repositories, "addTaskDB");
    mock.mockResolvedValue([
      {
        id: 1,
        title: "Добавить задачу в API",
        description: "Разработать REST API для управления задачами с использованием Node.js и PostgreSQL",
        completed: false,
        createdAt: "2024-01-25T11:30:00.000Z",
      },
    ]);

    const res = await addTask(
      1,
      "Добавить задачу в API",
      "Разработать REST API для управления задачами с использованием Node.js и PostgreSQL",
      false,
      "2024-01-25T11:30:00.000Z"
    );
    expect(mock).toHaveBeenCalled();
    expect(res).toEqual([
      {
        id: 1,
        title: "Добавить задачу в API",
        description: "Разработать REST API для управления задачами с использованием Node.js и PostgreSQL",
        completed: false,
        createdAt: "2024-01-25T11:30:00.000Z",
      },
    ]);
  });
  test("postTaskTest error:", async () => {
    const mock = jest.spyOn(repositories, "addTaskDB");
    mock.mockResolvedValue([]);
    try {
      await addTask(
        1,
        "Добавить задачу в API",
        "Разработать REST API для управления задачами с использованием Node.js и PostgreSQL",
        false,
        "2024-01-25T11:30:00.000Z"
      );
    } catch (error: any) {
      expect(mock).toHaveBeenCalled();
      expect(error.message).toBe("Empty task");
    }
  });
});
describe("putTaskTest", () => {
  test("putTaskTest sucsess", async () => {
    const mock = jest.spyOn(repositories, "updateTaskDB");
    mock.mockResolvedValue([
      {
        id: 1,
        title: "Добавить задачу",
        description: "Разработать REST API для управления задачами с использованием Node.js и PostgreSQL",
        completed: false,
        createdAt: "2025-01-25T11:30:00.000Z",
      },
    ]);

    const res = await updateTask(
      1,
      "Добавить задачу",
      "Разработать REST API для управления задачами с использованием Node.js и PostgreSQL",
      false,
      "2025-01-25T11:30:00.000Z"
    );
    expect(mock).toHaveBeenCalled();
    expect(res).toEqual([
      {
        id: 1,
        title: "Добавить задачу",
        description: "Разработать REST API для управления задачами с использованием Node.js и PostgreSQL",
        completed: false,
        createdAt: "2025-01-25T11:30:00.000Z",
      },
    ]);
  });
  test("putTaskTest error:", async () => {
    const mock = jest.spyOn(repositories, "updateTaskDB");
    mock.mockResolvedValue([]);
    try {
      await updateTask();
    } catch (error: any) {
      expect(mock).toHaveBeenCalled();
      expect(error.message).toBe("id doesnt exist");
    }
  });
});
describe("deleteTaskTest", () => {
  test("deleteTaskTest sucsess", async () => {
    const mock = jest.spyOn(repositories, "deleteTaskDB");
    mock.mockResolvedValue([
      {
        id: 2,
        title: "Завершить проект API",
        description: "Разработать REST API для управления задачами с использованием Node.js и PostgreSQL",
        completed: true,
        createdAt: "2024-01-25T11:30:00.000Z",
      },
    ]);
    const res = await deleteTask(2);
    expect(mock).toHaveBeenCalled();
    expect(res).toEqual([
      {
        id: 2,
        title: "Завершить проект API",
        description: "Разработать REST API для управления задачами с использованием Node.js и PostgreSQL",
        completed: true,
        createdAt: "2024-01-25T11:30:00.000Z",
      },
    ]);
  });
  test("deleteTest error", async () => {
    const mock = jest.spyOn(repositories, "deleteTaskDB");
    mock.mockResolvedValue([]);

    try {
      await deleteTask(2);
    } catch (err: any) {
      expect(mock).toHaveBeenCalled();
      expect(err.message).toBe("id doesnt exist");
    }
  });
});
