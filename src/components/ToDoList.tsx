import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
// interface IForms {
//     email: string;
//     firstName?: string;
//     lastName?: string;
//     userName: string;
//     password: string;
//     rePassword: string;
//     extraError?: string;
// }

// function ToDoList() {
//     const { 
//         register, 
//         watch, 
//         handleSubmit, 
//         formState:{errors}, 
//         setError 
//     } = useForm<IForms>({
//         defaultValues: {
//             email: "@naver.com",
//         }
//     });

//     const onValid = (data:IForms) => {
//         // 특정 조건에 따른 에러 발생
//         if(data.password !== data.rePassword) {
//             return setError(
//                 "rePassword", 
//                 { message: "Password are not same" },
//                 { shouldFocus: true}    // 에러 발생시 해당하는 인풋란에 focus 하고 싶은 경우
//             );
//         }
//         // 특정 조건이 아닌 form 전체에 에러 발생 시키기 ex : 서버 문제 등...
//         return setError("extraError", { message: "Server offline" });
//         console.log(data);
//     };

//     return (
//         <div>
//             <form style={{display: "flex", flexDirection: "column"}} onSubmit={handleSubmit(onValid)}>
//                 <input 
//                     {...register("email", {
//                         required: "Email required",
//                         pattern: {
//                             value: /^[A-Za-z0-9._%+-]+@naver.com$/,
//                             message: "Only naver.com emails allowed",
//                         }
//                     })} 
//                     placeholder="Email" 
//                 />
//                 <span>
//                     {errors?.email?.message}
//                 </span>
//                 <input 
//                     {...register("firstName", {
//                         required: "firstName required",
//                         validate: (value) => !value?.includes("raccoon") || "Don't include raccoon",
//                     })} 
//                     placeholder="First Name" 
//                 />
//                 <span>
//                     {errors?.firstName?.message}
//                 </span>
//                 <input 
//                     {...register("lastName", {
//                         required: "lastName required",
//                         validate: {
//                             noApple: (value) => 
//                                 !value?.includes("apple") || "no apple allowed",
//                             noBanana: (value) =>
//                                 !value?.includes("banana") || "no banana allowed",
//                         }
//                     })} 
//                     placeholder="Last Name" 
//                 />
//                 <span>
//                     {errors?.lastName?.message}
//                 </span>
//                 <input 
//                     {...register("userName", {
//                         required: "username reqiured", 
//                         minLength: {
//                             value: 5,
//                             message: "Your Username is short"
//                         }
//                     })} 
//                     placeholder="Username" 
//                 />
//                 <span>
//                     {errors?.userName?.message}
//                 </span>
//                 <input 
//                     {...register("password", {
//                         required:"Password is Required", 
//                         minLength: {
//                             value: 5,
//                             message: "Your Password is short"
//                         },
//                     })} 
//                     placeholder="password" 
//                 />
//                 <span>
//                     {errors?.password?.message}
//                 </span>
//                 <input 
//                     {...register("rePassword", {
//                         required:"Write password again", 
//                         minLength: {
//                             value: 5,
//                             message: "Your Password is short"
//                         },
//                     })} 
//                     placeholder="re-password" 
//                 />
//                 <span>
//                     {errors?.rePassword?.message}
//                 </span>
//                 <button>Add</button>
//                 <span>
//                     {errors?.extraError?.message}
//                 </span>
//             </form>
//         </div>
//     );
// }

interface IForm {
    toDo: string;
}

const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
});

interface IToDo {
    id: number;
    text: string;
    category: "TO_DO" | "DOING" | "DONE";
    // 선택지에 제한이 있을때 
    // 즉, 이 경우엔 카테고리가 string이 아닌 3가지의 옵션만 가능하다면 명시 가능
}

function ToDoList() {
    // const toDoList = useRecoilValue(toDoState);
    // const setToDoState = useSetRecoilState(toDoState);

    const [toDos, setToDos] = useRecoilState(toDoState);
    // useRecoilState : useRecoilValue + useSetRecoilState (value + modifier fn)
    
    const { 
        register, 
        handleSubmit ,
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
    console.log(toDos);
    
    return (
        <div>
            <h1>Today's ToDo List</h1>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)}>
                <input 
                    {...register("toDo", {
                        required: "Write to Do"
                    })}
                    placeholder="Write to do" 
                />
                <button>Add</button>
            </form>
            <ul>
                {toDos.map((toDo) => 
                    <li key={toDo.id}>{toDo.category} - {toDo.text}</li>
                )}
            </ul>
        </div>
    );
}

export default ToDoList;