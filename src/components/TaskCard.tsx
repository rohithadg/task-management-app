import { useState } from "react";
import { SetState, Task } from "../types/task";
import { useTaskMutations } from "../hooks/useTaskMutations";

type TaskCardProps = {
  task: Task;
  setTasks: SetState<Task[]>;
  onEdit: (task: Task) => void;
};

export const TaskCard = ({ task, setTasks, onEdit }: TaskCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisabled = isUpdating || isDeleting;

  const { removeTask, modifyTask } = useTaskMutations({ setTasks });

  const handleDelete = async (id: string) => {
    console.log("handle delete");
    setIsDeleting(true);
    await removeTask(id);
    setIsDeleting(false);
  };

  const handleTaskStatusUpdate = async (task: Task, status: Task["status"]) => {
    console.log("handle update status");
    setIsUpdating(true);
    const taskToUpdate: Task = {
      ...task,
      status,
    };
    await modifyTask(task.id, taskToUpdate);
    setIsUpdating(false);
  };

  return (
    <div
      className={`border rounded-lg p-4 mb-3 transition-all ${
        isDisabled
          ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-white border-gray-300"
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg">{task.title}</h3>
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            task.status === "Completed"
              ? "bg-green-100 text-green-800"
              : task.status === "In Progress"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {task.status}
        </span>
      </div>

      {task.description && (
        <p className="text-gray-600 mb-3">{task.description}</p>
      )}

      <div className="flex justify-end space-x-2">
        <select
          value={task.status}
          onChange={(e) =>
            handleTaskStatusUpdate(task, e.target.value as Task["status"])
          }
          disabled={isUpdating}
          className="text-sm p-1 border rounded"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button
          onClick={() => onEdit(task)}
          className="px-3 py-1 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded text-sm"
        >
          Edit
        </button>

        <button
          onClick={() => handleDelete(task.id)}
          disabled={isDeleting}
          className={`px-3 py-1 rounded text-sm ${
            isDeleting
              ? "bg-gray-300"
              : "bg-red-100 text-red-600 hover:bg-red-200"
          }`}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};
