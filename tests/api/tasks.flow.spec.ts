import { test, expect } from "../../src/fixtures/apiFixture";
import { Task } from "../../src/api/tasksApi";

test.describe.serial("Tasks API", () => {
  let createdTask: Task;

  test.afterAll(async ({ tasksApi }) => {
    if (createdTask?.id) {
      await tasksApi.deleteTask(createdTask.id);
    }
  });

  test("GET /tasks returns task list", async ({ tasksApi }) => {
    const { status, body } = await tasksApi.getAllTasks();
    expect(status).toBe(200);
    expect(Array.isArray(body)).toBe(true);
  });

  test("POST /tasks creates a new task", async ({ tasksApi }) => {
    const { status, body } = await tasksApi.createTask({ text: "Flow test task" });
    expect(status).toBe(200);
    createdTask = body;
    expect(createdTask.text).toBe("Flow test task");
    expect(createdTask.completed).toBe(false);
    expect(typeof createdTask.id).toBe("string");
    expect(typeof createdTask.createdDate).toBe("number");

    const { body: tasks } = await tasksApi.getAllTasks();
    expect(tasks.some((t) => t.id === createdTask.id)).toBe(true);
  });

  test("POST /tasks/{id} updates the task", async ({ tasksApi }) => {
    const { status, body } = await tasksApi.updateTask(createdTask.id, { text: "Flow test task - updated" });
    expect(status).toBe(200);
    expect(body.id).toBe(createdTask.id);
    expect(body.text).toBe("Flow test task - updated");
  });

  test("DELETE /tasks/{id} deletes the task", async ({ tasksApi }) => {
    const { status } = await tasksApi.deleteTask(createdTask.id);
    expect(status).toBe(200);

    const { body: tasks } = await tasksApi.getAllTasks();
    expect(tasks.some((t) => t.id === createdTask.id)).toBe(false);
  });
});
