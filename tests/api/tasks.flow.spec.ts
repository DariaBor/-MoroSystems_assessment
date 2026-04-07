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
    const { status, body, debug } = await tasksApi.getAllTasks();
    expect(status, debug).toBe(200);
    expect(Array.isArray(body), debug).toBe(true);
  });

  test("POST /tasks creates a new task", async ({ tasksApi }) => {
    const { status, body, debug } = await tasksApi.createTask({ text: "Flow test task" });
    expect(status, debug).toBe(200);
    createdTask = body;
    expect(createdTask.text, debug).toBe("Flow test task");
    expect(createdTask.completed, debug).toBe(false);
    expect(typeof createdTask.id, debug).toBe("string");
    expect(typeof createdTask.createdDate, debug).toBe("number");

    const { body: tasks, debug: listDebug } = await tasksApi.getAllTasks();
    expect(tasks.some((t) => t.id === createdTask.id), listDebug).toBe(true);
  });

  test("POST /tasks/{id} updates the task", async ({ tasksApi }) => {
    const { status, body, debug } = await tasksApi.updateTask(createdTask.id, { text: "Flow test task - updated" });
    expect(status, debug).toBe(200);
    expect(body.id, debug).toBe(createdTask.id);
    expect(body.text, debug).toBe("Flow test task - updated");
  });

  test("DELETE /tasks/{id} deletes the task", async ({ tasksApi }) => {
    const { status, debug } = await tasksApi.deleteTask(createdTask.id);
    expect(status, debug).toBe(200);

    const { body: tasks, debug: listDebug } = await tasksApi.getAllTasks();
    expect(tasks.some((t) => t.id === createdTask.id), listDebug).toBe(false);
  });
});
