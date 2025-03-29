import axios from "axios";
import { PaginatedResponse, Task } from "../types/task";

const API_URL =
  "https://l61kllx2nh.execute-api.ap-southeast-2.amazonaws.com/prod/tasks";

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await axios.get<PaginatedResponse<Task>>(API_URL);
  return response.data?.items;
};

export const createTask = async (task: Omit<Task, "id">): Promise<Task> => {
  const response = await axios.post<Task>(API_URL, task, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const updateTask = async (
  id: string,
  task: Partial<Task>
): Promise<Task> => {
  const response = await axios.put<Task>(`${API_URL}/${id}`, task, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
