import type { Dispatch, SetStateAction } from "react";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "To Do" | "In Progress" | "Completed";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PaginatedResponse<T> {
  items: T[];
  lastKey?: string;
}

export type SetState<T> = Dispatch<SetStateAction<T>>;
