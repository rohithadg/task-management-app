import { useCallback } from "react";
import { createTask, updateTask, deleteTask } from "../api/taskService";
import { SetState, Task } from "../types/task";
import { useAppState } from "../hooks/useAppState";

type MutationTasksDependencies = {
  setTasks: SetState<Task[]>;
};

export const useTaskMutations = ({ setTasks }: MutationTasksDependencies) => {
  const { setIsLoading, setError } = useAppState();

  const addTask = useCallback(
    async (taskData: Omit<Task, "id">) => {
      try {
        setIsLoading(true);
        setError(undefined);

        const newTask = await createTask(taskData);

        setTasks((prev) => [...prev, newTask]);
        return newTask;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to add task");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setError, setTasks]
  );

  const modifyTask = useCallback(
    async (taskId: string, updates: Partial<Task>) => {
      try {
        setIsLoading(true);
        setError(undefined);

        const updatedTask = await updateTask(taskId, updates);

        setTasks((prev) =>
          prev.map((t) => (t.id === taskId ? updatedTask : t))
        );

        return updatedTask;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update task");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setError, setTasks]
  );

  const removeTask = useCallback(
    async (taskId: string) => {
      try {
        setIsLoading(true);
        setError(undefined);

        await deleteTask(taskId);
        setTasks((prev) => prev.filter((t) => t.id !== taskId));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to delete task");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setError, setTasks]
  );

  return { addTask, modifyTask, removeTask };
};
