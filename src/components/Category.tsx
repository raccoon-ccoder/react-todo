import React from "react";
import { useResetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { toDoState, categoryState, toDoSelector } from "../atoms";

function Category() {
  const toDos = useRecoilValue(toDoSelector);
  const [categories, setCategory] = useRecoilState(categoryState);

  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    setCategory(e.currentTarget.value as any);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {};

  return (
    <>
      <h2>select category</h2>
      <select onInput={onInput}>
        {categories.map((category) => (
          <option value={category.name}>{category.name}</option>
        ))}
      </select>
      <h2>add category</h2>
      <form>
        <input type="text" placeholder="write category" required />
      </form>
    </>
  );
}

export default Category;
