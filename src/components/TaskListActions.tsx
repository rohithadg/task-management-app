import RefreshIcon from "@mui/icons-material/Refresh";

type TaskListActionsProps = {
  showForm: boolean;
  onAddTask: () => void;
  onRefresh: () => void;
};

export const TaskListActions = ({
  showForm,
  onAddTask,
  onRefresh,
}: TaskListActionsProps) => (
  <div className="flex justify-between items-center mb-4">
    {!showForm && (
      <button
        onClick={onAddTask}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Add Task
      </button>
    )}
    {showForm && <div />}{" "}
    <button
      onClick={onRefresh}
      className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors"
      aria-label="Refresh tasks"
    >
      <RefreshIcon className="h-5 w-5" />
    </button>
  </div>
);
