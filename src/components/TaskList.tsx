import { TaskCard } from "../components/TaskCard";
import { SetState, Task } from "../types/task";
import { TaskForm } from "./TaskForm";
import { useState } from "react";
import { TaskListActions } from "./TaskListActions";

type TaskListProps = {
  tasks: Task[];
  setTasks: SetState<Task[]>;
  refreshTasks: () => Promise<void>;
};

export const TaskList = ({ tasks, setTasks, refreshTasks }: TaskListProps) => {
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  return (
    <div className="space-y-4">
      <TaskListActions
        showForm={showForm || !!editingTask}
        onAddTask={() => {
          setEditingTask(undefined);
          setShowForm(true);
        }}
        onRefresh={refreshTasks}
      />

      {(showForm || editingTask) && (
        <TaskForm
          task={editingTask}
          setTasks={setTasks}
          onCancel={() => {
            setShowForm(false);
            setEditingTask(undefined);
          }}
          onSuccess={() => {
            setShowForm(false);
            setEditingTask(undefined);
          }}
        />
      )}

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            setTasks={setTasks}
            onEdit={(task) => {
              setEditingTask(task);
              setShowForm(true);
            }}
          />
        ))}
      </div>
    </div>
  );
};
