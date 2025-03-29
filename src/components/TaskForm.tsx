import { useState, useEffect } from "react";
import { Task, SetState } from "../types/task";
import { useTaskMutations } from "../hooks/useTaskMutations";
import { CircularProgress } from "@mui/material";

type TaskFormProps = {
  task?: Task;
  setTasks: SetState<Task[]>;
  setIsLoading: SetState<boolean>;
  setError: SetState<string | undefined>;
  onCancel: () => void;
  onSuccess?: () => void;
};

export const TaskForm = ({
  task,
  setTasks,
  setIsLoading,
  setError,
  onCancel,
  onSuccess,
}: TaskFormProps) => {
  const [formData, setFormData] = useState<Partial<Task>>({
    title: "",
    description: "",
    status: "To Do",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addTask, modifyTask } = useTaskMutations({
    setTasks,
    setIsLoading,
    setError,
  });

  useEffect(() => {
    if (task) {
      setFormData(task);
    }
  }, [task]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (task) {
        await modifyTask(task.id, formData as Task);
      } else {
        await addTask(formData as Task);
      }

      onSuccess?.();
      if (!task) {
        setFormData({ title: "", description: "", status: "To Do" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const disabledStyles =
    "bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed";
  const enabledStyles = "bg-white border-gray-300";

  return (
    <form
      onSubmit={handleSubmit}
      className={`mb-8 p-4 border rounded-lg transition-all ${
        isSubmitting ? disabledStyles : enabledStyles
      }`}
    >
      <div className="space-y-4 mb-4">
        <div>
          <label htmlFor="task-title" className="block mb-1">
            Title*
          </label>
          <input
            id="task-title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Task title"
            required
            disabled={isSubmitting}
            className="w-full p-2 border rounded disabled:bg-gray-200"
          />
        </div>

        <div>
          <label htmlFor="task-description" className="block mb-1">
            Description
          </label>
          <textarea
            id="task-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Task description"
            rows={3}
            disabled={isSubmitting}
            className="w-full p-2 border rounded disabled:bg-gray-200"
          />
        </div>

        <div>
          <label htmlFor="task-status" className="block mb-1">
            Status
          </label>
          <select
            id="task-status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full p-2 border rounded disabled:bg-gray-200"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1 p-2 bg-gray-300 hover:bg-gray-400 rounded transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex-1 p-2 text-white rounded transition-colors ${
            isSubmitting ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? (
            <span className="inline-flex items-center justify-center gap-2">
              <CircularProgress size={16} color="inherit" />
              {task ? "Saving..." : "Adding..."}
            </span>
          ) : task ? (
            "Save Changes"
          ) : (
            "Add Task"
          )}
        </button>
      </div>
    </form>
  );
};
