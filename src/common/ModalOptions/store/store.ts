import { create } from 'zustand';

interface Store {
  id: number;
}
interface Actions {
  setId: (v: number) => void;
}

export const useStore = create<Store & Actions>((set) => ({
  id: 0,
  setId: (id) => set({ id }),
}));
