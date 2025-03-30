import { useCallback } from "react";
import { fetchTasks } from "../api/taskService";
import { SetState, Task } from "../types/task";
import { useAppState } from "../hooks/useAppState";

type FetchTasksDependencies = {
  setTasks: SetState<Task[]>;
};

export const useFetchTasks = ({ setTasks }: FetchTasksDependencies) => {
  const { setIsLoading, setError } = useAppState();

  const fetchTasksData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(undefined);

      // await new Promise((f) => setTimeout(f, 3_000));
      const data = await fetchTasks();

      setTasks([...data]);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch tasks");
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  }, [setError, setIsLoading, setTasks]);

  return { fetchTasksData };
};
