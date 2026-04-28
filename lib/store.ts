import { create } from "zustand";
import type { Todo } from "@/lib/types";

interface TodoStore {
  todos: Todo[];
  addTodo: (text: string, parentId?: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  setTodos: (todos: Todo[]) => void;
}

const hasCircularDependency = (todos: Todo[], taskId: string, parentId: string): boolean => {
  if (taskId === parentId) return true;
  
  let currentParentId: string | undefined = parentId;
  const visited = new Set<string>();
  
  while (currentParentId && !visited.has(currentParentId)) {
    if (currentParentId === taskId) return true;
    visited.add(currentParentId);
    const parent = todos.find((t) => t.id === currentParentId);
    currentParentId = parent?.parentId;
  }
  
  return false;
};

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  addTodo: (text: string, parentId?: string) => {
    set((state) => {
      if (parentId && hasCircularDependency(state.todos, Date.now().toString(), parentId)) {
        return state;
      }
      
      const parentExists = parentId ? state.todos.some((t) => t.id === parentId) : true;
      if (!parentExists) {
        return state;
      }
      
      return {
        todos: [
          ...state.todos,
          {
            id: Date.now().toString(),
            text,
            completed: false,
            createdAt: Date.now(),
            parentId,
          },
        ],
      };
    });
  },
  toggleTodo: (id: string) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  },
  deleteTodo: (id: string) => {
    set((state) => {
      const subtasks = state.todos.filter((t) => t.parentId === id);
      const orphanedSubtasks = subtasks.map((t) => ({
        ...t,
        parentId: undefined,
      }));
      const otherTodos = state.todos.filter((t) => t.id !== id && t.parentId !== id);
      return {
        todos: [...otherTodos, ...orphanedSubtasks],
      };
    });
  },
  setTodos: (todos: Todo[]) => {
    set({ todos });
  },
}));
