"use client";

import { Trash2 } from "lucide-react";
import type { Todo } from "@/lib/types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
}: TodoItemProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.currentTarget.click();
    }
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        onKeyDown={handleKeyDown}
        className="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
        aria-label={`${todo.text}${todo.completed ? " (completed)" : ""}`}
      />
      <span
        className={`flex-1 ${
          todo.completed
            ? "line-through text-gray-400"
            : "text-gray-800"
        }`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        onKeyDown={handleKeyDown}
        className="p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
        aria-label={`Delete ${todo.text}`}
        type="button"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
