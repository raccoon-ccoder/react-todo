import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import CreateToDo from "./CreateToDo";
import { categoryState, IToDo, toDoSelector, toDoState } from "../atoms";
import ToDo from "./ToDo";
import Category from "./Category";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);

  return (
    <div>
      <h1>Today's ToDo List</h1>
      <hr />
      <Category />
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
