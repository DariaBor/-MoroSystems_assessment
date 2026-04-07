import { APIRequestContext, APIResponse } from "@playwright/test";

export class ApiClient {
  constructor(
    private readonly request: APIRequestContext,
    private readonly baseURL: string,
  ) {}

  async get(
    path: string,
    params?: Record<string, string | number>,
  ): Promise<APIResponse> {
    return this.request.get(`${this.baseURL}${path}`, { params });
  }

  async post<T>(path: string, body: T): Promise<APIResponse> {
    return this.request.post(`${this.baseURL}${path}`, { data: body });
  }

  async put<T>(path: string, body: T): Promise<APIResponse> {
    return this.request.put(`${this.baseURL}${path}`, { data: body });
  }

  async patch<T>(path: string, body: T): Promise<APIResponse> {
    return this.request.patch(`${this.baseURL}${path}`, { data: body });
  }

  async delete(path: string): Promise<APIResponse> {
    return this.request.delete(`${this.baseURL}${path}`);
  }
}
