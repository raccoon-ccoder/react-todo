import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { toDoState, IToDo, categoryState, selectedCategory } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const category = useRecoilValue(selectedCategory);

  const onSubmit = ({ toDo }: IForm) => {
    const toDoThing: IToDo = {
      id: Date.now(),
      text: toDo,
      category: category.name,
    };
    setToDos((prev) => [toDoThing, ...prev]);
    setValue("toDo", "");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("toDo", {
          required: "Write to Do",
        })}
        placeholder="Write to do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
