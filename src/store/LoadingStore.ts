import { create } from "zustand";

interface LoadingState {
  loading: boolean;
  setLoading: (state: boolean) => void;
}

export const useLoadingStore = create<LoadingState>((set, get) => ({
  loading: false,
  setLoading: (state: boolean) => set({ loading: state }),
}));
