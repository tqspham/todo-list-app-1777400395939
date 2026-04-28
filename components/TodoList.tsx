"use client";

import { useState } from "react";
import TodoItem from "@/components/TodoItem";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import type { Todo } from "@/lib/types";

interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}

export default function TodoList({
  todos,
  onToggleTodo,
  onDeleteTodo,
}: TodoListProps) {
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());

  const handleConfirmDelete = (id: string) => {
    onDeleteTodo(id);
    setDeleteConfirm(null);
  };

  const handleToggleExpand = (id: string) => {
    const newExpanded = new Set(expandedTasks);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedTasks(newExpanded);
  };

  const rootTodos = todos.filter((t) => !t.parentId);

  const renderTodoWithSubtasks = (todo: Todo, depth: number = 0): React.ReactNode => {
    const subtasks = todos.filter((t) => t.parentId === todo.id);
    const isExpanded = expandedTasks.has(todo.id);

    return (
      <div key={todo.id} className={depth > 0 ? "ml-4" : ""}>
        <li>
          <TodoItem
            todo={todo}
            onToggle={onToggleTodo}
            onDelete={() => setDeleteConfirm(todo.id)}
            isExpanded={isExpanded}
            onToggleExpand={handleToggleExpand}
            hasSubtasks={subtasks.length > 0}
          />
        </li>
        {isExpanded && subtasks.length > 0 && (
          <ul
            className="space-y-2 mt-2"
            role="group"
            aria-label={`Subtasks for ${todo.text}`}
          >
            {subtasks.map((subtask) => renderTodoWithSubtasks(subtask, depth + 1))}
          </ul>
        )}
      </div>
    );
  };

  if (rootTodos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No todos yet. Add one to get started.</p>
      </div>
    );
  }

  return (
    <>
      <ul className="space-y-2">
        {rootTodos.map((todo) => renderTodoWithSubtasks(todo))}
      </ul>
      {deleteConfirm && (
        <DeleteConfirmDialog
          onConfirm={() => handleConfirmDelete(deleteConfirm)}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}
    </>
  );
}
