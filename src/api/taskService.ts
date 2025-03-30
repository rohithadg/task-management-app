import axios from "axios";
import { PaginatedResponse, Task } from "../types/task";

const API_URL = import.meta.env.VITE_API_URL || "";
const baseUrl = `${API_URL}/tasks`;

const headers = {
  "Content-Type": "application/json",
};

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await axios.get<PaginatedResponse<Task>>(baseUrl);
  return response.data?.items;
};

export const createTask = async (task: Omit<Task, "id">): Promise<Task> => {
  const response = await axios.post<Task>(baseUrl, task, { headers });
  return response.data;
};

export const updateTask = async (
  id: string,
  task: Partial<Task>
): Promise<Task> => {
  const response = await axios.put<Task>(`${baseUrl}/${id}`, task, { headers });
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`${baseUrl}/${id}`, { headers });
};
