import { atom } from "recoil";

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
});

export interface IToDo {
    id: number;
    text: string;
    category: "TO_DO" | "DOING" | "DONE";
    // 선택지에 제한이 있을때 
    // 즉, 이 경우엔 카테고리가 string이 아닌 3가지의 옵션만 가능하다면 명시 가능
}