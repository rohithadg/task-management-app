import { CircularProgress, Button, Alert } from "@mui/material";
import { useAppState } from "../hooks/useAppState";

type TaskNotificationsProps = {
  refreshTasks: () => Promise<void>;
};

export const TaskNotifications = ({ refreshTasks }: TaskNotificationsProps) => {
  const { isLoading, error } = useAppState();

  if (isLoading) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <Alert
          severity="info"
          icon={<CircularProgress size={20} color="info" />}
          className="shadow-lg"
        >
          Loading tasks...
        </Alert>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <Alert
          severity="error"
          className="shadow-lg"
          action={
            <Button color="inherit" size="small" onClick={refreshTasks}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </div>
    );
  }

  return null;
};
