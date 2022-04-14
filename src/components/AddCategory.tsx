import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

const Form = styled.form``;

const Input = styled.input`
  width: 200px;
  height: 30px;
  border-radius: 5px;
`;

interface IForm {
  category: string;
}

function AddCategory() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);

  const onValid = ({ category }: IForm) => {
    setToDos((allBoards) => {
      return { ...allBoards, [category]: [] };
    });
    setValue("category", "");
  };
  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Input
        {...register("category", { required: true })}
        placeholder="Add category"
      />
    </Form>
  );
}

export default AddCategory;
