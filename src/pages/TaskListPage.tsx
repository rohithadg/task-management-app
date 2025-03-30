import { useEffect } from "react";
import { TaskList } from "../components/TaskList";
import { useTasks } from "../hooks/useTasks";
import { TaskNotifications } from "../components/TaskNotifications";
import { useFetchTasks } from "../hooks/useFetchTasks";
import { Container, Paper } from "@mui/material";

function TaskListPage() {
  const { tasks, setTasks, isLoading, setIsLoading, error, setError } =
    useTasks();
  const { fetchTasksData } = useFetchTasks({
    setTasks,
    setIsLoading,
    setError,
  });

  useEffect(() => {
    fetchTasksData();
  }, [fetchTasksData]);

  return (
    <Container component="main" maxWidth="md" className="space-y-6">
      <Paper elevation={3} className="p-6">
        <TaskList
          tasks={tasks}
          setTasks={setTasks}
          setError={setError}
          setIsLoading={setIsLoading}
          refreshTasks={fetchTasksData}
        />
      </Paper>

      <TaskNotifications
        isLoading={isLoading}
        error={error}
        refreshTasks={fetchTasksData}
      />
    </Container>
  );
}

export default TaskListPage;
