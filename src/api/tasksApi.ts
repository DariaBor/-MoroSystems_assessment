import { APIResponse } from "@playwright/test";
import { ApiClient } from "./apiClient";
import { components } from "./generated/schema";

export type Task = components["schemas"]["Task"];
export type CreateTask = components["schemas"]["CreateTask"];
export type UpdateTask = components["schemas"]["UpdateTask"];

export type ApiResult<T> = {
  status: number;
  body: T;
};

async function parseResponse<T>(res: APIResponse): Promise<ApiResult<T>> {
  return { status: res.status(), body: await res.json() };
}

export class TasksApi {
  constructor(private readonly apiClient: ApiClient) {}

  async getAllTasks(): Promise<ApiResult<Task[]>> {
    return parseResponse<Task[]>(await this.apiClient.get("/tasks"));
  }

  async getCompletedTasks(): Promise<ApiResult<Task[]>> {
    return parseResponse<Task[]>(await this.apiClient.get("/tasks/completed"));
  }

  async createTask(body: CreateTask): Promise<ApiResult<Task>> {
    return parseResponse<Task>(await this.apiClient.post("/tasks", body));
  }

  // this is nonRestful since usually it is PUT for update, but according to your doc should be like this
  async updateTask(id: string, body: UpdateTask): Promise<ApiResult<Task>> {
    return parseResponse<Task>(await this.apiClient.post(`/tasks/${id}`, body));
  }

  async deleteTask(id: string): Promise<ApiResult<string>> {
    return parseResponse<string>(await this.apiClient.delete(`/tasks/${id}`));
  }

  async completeTask(id: string): Promise<ApiResult<Task>> {
    return parseResponse<Task>(await this.apiClient.post(`/tasks/${id}/complete`, undefined));
  }

  async incompleteTask(id: string): Promise<ApiResult<Task>> {
    return parseResponse<Task>(await this.apiClient.post(`/tasks/${id}/incomplete`, undefined));
  }
}
