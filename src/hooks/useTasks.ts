import { useState } from "react";
import { Task } from "../types/task";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  return {
    tasks,
    setTasks,

    isLoading,
    setIsLoading,

    error,
    setError,
  };
};
