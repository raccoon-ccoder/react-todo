import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IToDo, selectedCategory, toDoState } from "../atoms";
import { categoryState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoryState);
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = e;
    setToDos((oldToDos) => {
      return oldToDos.map((toDo) =>
        toDo.id === id ? { ...toDo, category: name as any } : toDo
      );
    });
  };

  // 버튼 클릭시 카테고리도 변경됨
  return (
    <li>
      <span>{text}</span>
      {categories.map((item) => {
        if (item.name !== category)
          return (
            <button name={item.name} onClick={onClick}>
              {item.name}
            </button>
          );
      })}
    </li>
  );
}

export default ToDo;
