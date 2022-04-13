import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import Category from "./components/Category";
import { useRecoilValue } from "recoil";

const { persistAtom } = recoilPersist({
  key: "toDoList",
  storage: localStorage,
});

const { persistAtom: categoryPersist } = recoilPersist({
  key: "categoryList",
  storage: localStorage,
});

export const categoryState = atom<ICategory[]>({
  key: "category",
  default: [],
  effects_UNSTABLE: [categoryPersist],
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const selectedCategory = atom<ICategory>({
  key: "selectedCategory",
  default: { name: "DONE" },
});

export interface ICategory {
  name: string;
}

export interface IToDo {
  id: number;
  text: string;
  category: string;
  // 선택지에 제한이 있을때
  // 즉, 이 경우엔 카테고리가 string이 아닌 3가지의 옵션만 가능하다면 명시 가능
}

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(selectedCategory);
    return toDos.filter((toDo) => toDo.category === category.name);
  },
});
