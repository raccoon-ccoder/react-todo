import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState, IToDo } from "../atoms";

interface IForm {
    toDo: string;
}

function CreateToDo() {
    const setToDos = useSetRecoilState(toDoState);

    const { 
        register,
        handleSubmit,
        setValue
    } = useForm<IForm>();

    const onSubmit = ({ toDo }:IForm) => {
        const toDoThing: IToDo = {
            id: Date.now(), 
            text: toDo, 
            category: "TO_DO"
        };
        setToDos((prev) => [toDoThing,...prev]);
        setValue("toDo", "");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input 
                {...register("toDo", {
                    required: "Write to Do"
                })}
                placeholder="Write to do" 
            />
            <button>Add</button>
        </form>
    );

}

export default CreateToDo;