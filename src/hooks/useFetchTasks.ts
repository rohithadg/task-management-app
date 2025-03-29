import { useCallback } from "react";
import { fetchTasks } from "../api/taskService";
import { SetState, Task } from "../types/task";

type FetchTasksDependencies = {
  setTasks: SetState<Task[]>;
  setIsLoading: SetState<boolean>;
  setError: SetState<string | undefined>;
};

export const useFetchTasks = ({
  setTasks,
  setIsLoading,
  setError,
}: FetchTasksDependencies) => {
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
