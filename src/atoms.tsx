import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "toDo",
  storage: localStorage,
});

export interface IToDoState {
  [key: string]: IToDo[];
}

export interface IToDo {
  id: number;
  text: string;
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    to_do: [],
    doing: [],
    done: [],
  },
  effects_UNSTABLE: [persistAtom],
});
