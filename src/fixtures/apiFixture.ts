import { test as base } from '@playwright/test';
import { ApiClient } from '../api/apiClient';
import { TasksApi } from '../api/tasksApi';

type ApiFixtures = {
  tasksApi: TasksApi;
};

export const test = base.extend<ApiFixtures>({
  tasksApi: async ({ request }, use) => {
    const client = new ApiClient(request, process.env.API_URL!);
    await use(new TasksApi(client));
  },
});

export { expect } from '@playwright/test';
