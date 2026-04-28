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

  const handleConfirmDelete = (id: string) => {
    onDeleteTodo(id);
    setDeleteConfirm(null);
  };

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No todos yet. Add one to get started.</p>
      </div>
    );
  }

  return (
    <>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id}>
            <TodoItem
              todo={todo}
              onToggle={onToggleTodo}
              onDelete={() => setDeleteConfirm(todo.id)}
            />
          </li>
        ))}
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
