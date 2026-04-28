"use client";

import { useEffect, useState } from "react";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { useTodoStore } from "@/lib/store";
import type { Todo } from "@/lib/types";

const STORAGE_KEY = "todos";

export default function TodoApp() {
  const { todos, addTodo, toggleTodo, deleteTodo, setTodos } = useTodoStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load todos from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: Todo[] = JSON.parse(stored);
        setTodos(parsed);
      }
    } catch (err) {
      setError("Failed to load todos");
    } finally {
      setIsLoading(false);
    }
  }, [setTodos]);

  // Save todos to local storage whenever they change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      } catch (err) {
        setError("Failed to save todos");
      }
    }
  }, [todos, isLoading]);

  const handleAddTodo = (text: string, parentId?: string) => {
    addTodo(text, parentId);
  };

  const handleToggleTodo = (id: string) => {
    toggleTodo(id);
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodo(id);
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Todo App</h1>
        <TodoForm onAddTodo={handleAddTodo} todos={todos} />
        <TodoList
          todos={todos}
          onToggleTodo={handleToggleTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      </div>
    </div>
  );
}
