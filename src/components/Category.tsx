import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useResetRecoilState,
  useRecoilValue,
  useRecoilState,
  useSetRecoilState,
} from "recoil";
import {
  toDoState,
  categoryState,
  toDoSelector,
  ICategory,
  selectedCategory,
} from "../atoms";

function Category() {
  const [categories, setCategories] = useRecoilState(categoryState);
  const { register, handleSubmit, setValue } = useForm<ICategory>();
  const [category, setCategory] = useRecoilState(selectedCategory);

  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    setCategory({ name: e.currentTarget.value as any });
  };

  const onSubmit = ({ name }: ICategory) => {
    const newCategory: ICategory = { name };
    setCategories((prev) => [newCategory, ...prev]);
    setValue("name", "");
  };

  useEffect(() => {
    setCategory(categories[0]);
  }, []);

  return (
    <>
      <h2>select category</h2>
      <select onInput={onInput}>
        {categories.map((category) => (
          <option value={category.name}>{category.name}</option>
        ))}
      </select>
      <h2>add category</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", {
            required: "Write Category",
          })}
          placeholder="write category"
        />
        <button>Add</button>
      </form>
    </>
  );
}

export default Category;
