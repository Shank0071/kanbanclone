import { create } from "zustand";

interface BoardState {
  id: string;
  setId: (id: string) => void;
  uItems: Cards[];
  setUItems: (items: Cards[]) => void;
  doneItems: Cards[];
  setDoneItems: (items: Cards[]) => void;
  inProgressItems: Cards[];
  setInProgressItems: (items: Cards[]) => void;
  todoItems: Cards[];
  setTodoItems: (items: Cards[]) => void;
  updateTaskById: (id: string, task: any) => void;
  getBoard: (id: string) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  id: "",
  setId: (id) => set({ id: id }),
  uItems: [],
  setUItems: (newItems) => set({ uItems: newItems }),
  doneItems: [],
  setDoneItems: (doneItems) => set({ doneItems }),
  inProgressItems: [],
  setInProgressItems: (inProgressItems) => set({ inProgressItems }),
  todoItems: [],
  setTodoItems: (todoItems) => set({ todoItems }),
  updateTaskById: async (id: string, task: any) => {
    const url = `/api/tasks/${id}`;
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    };
    try {
      const res = await fetch(url, options);
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(`An error occurred ${err}`);
    }
  },
  getBoard: async (id: string) => {
    const url = `/api/tasks/${id}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (err) {
      console.log("An error occurred: ", err);
    }
  },
}));
