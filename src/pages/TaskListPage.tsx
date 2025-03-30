import { useEffect, useState } from "react";
import { TaskList } from "../components/TaskList";
import { TaskNotifications } from "../components/TaskNotifications";
import { useFetchTasks } from "../hooks/useFetchTasks";
import { Container, Paper } from "@mui/material";
import { Task } from "../types/task";

function TaskListPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const { fetchTasksData } = useFetchTasks({ setTasks });

  useEffect(() => {
    fetchTasksData();
  }, [fetchTasksData]);

  return (
    <Container component="main" maxWidth="md" className="space-y-6">
      <Paper elevation={3} className="p-6">
        <TaskList
          tasks={tasks}
          setTasks={setTasks}
          refreshTasks={fetchTasksData}
        />
      </Paper>

      <TaskNotifications refreshTasks={fetchTasksData} />
    </Container>
  );
}

export default TaskListPage;
