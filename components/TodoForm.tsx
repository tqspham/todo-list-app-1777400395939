"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";

interface TodoFormProps {
  onAddTodo: (text: string) => void;
}

const MAX_LENGTH = 255;

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = input.trim();

    if (!trimmed) {
      setError("Please enter a todo");
      return;
    }

    if (trimmed.length > MAX_LENGTH) {
      setError(`Todo must be ${MAX_LENGTH} characters or less`);
      return;
    }

    onAddTodo(trimmed);
    setInput("");
    setError(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_LENGTH) {
      setInput(value);
      setError(null);
    }
  };

  const handleClear = () => {
    setInput("");
    setError(null);
  };

  const isValid = input.trim().length > 0;

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-2">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={handleChange}
              placeholder="Add a new todo..."
              maxLength={MAX_LENGTH}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Todo input field"
            />
            {input && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                aria-label="Clear input"
              >
                <X size={18} />
              </button>
            )}
          </div>
          <button
            type="submit"
            disabled={!isValid}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
            aria-label="Add todo"
          >
            <Plus size={18} />
            Add
          </button>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {input && (
        <p className="text-gray-500 text-xs">
          {input.length}/{MAX_LENGTH}
        </p>
      )}
    </form>
  );
}
