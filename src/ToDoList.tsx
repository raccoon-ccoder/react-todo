import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IForms {
    email: string;
    firstName?: string;
    lastName?: string;
    userName: string;
    password: string;
}

function ToDoList() {
    const { register, watch, handleSubmit, formState:{errors} } = useForm<IForms>({
        defaultValues: {
            email: "@naver.com",
        }
    });
    const onValid = (data:any) => {
        console.log(data);
    };
    // console.log(watch());

    return (
        <div>
            <form style={{display: "flex", flexDirection: "column"}} onSubmit={handleSubmit(onValid)}>
                <input 
                    {...register("email", {
                        required: "Email required",
                        pattern: {
                            value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                            message: "Only naver.com emails allowed",
                        }
                    })} 
                    placeholder="Email" 
                />
                <span>
                    {errors?.email?.message}
                </span>
                <input 
                    {...register("firstName")} 
                    placeholder="First Name" 
                />
                <span>
                    {errors?.firstName?.message}
                </span>
                <input 
                    {...register("lastName")} 
                    placeholder="Last Name" 
                />
                <span>
                    {errors?.lastName?.message}
                </span>
                <input 
                    {...register("userName", {
                        required: "username reqiured", 
                        minLength: {
                            value: 5,
                            message: "Your Username is short"
                        }
                    })} 
                    placeholder="Username" 
                />
                <span>
                    {errors?.userName?.message}
                </span>
                <input 
                    {...register("password", {
                        required:"Password is Required", 
                        minLength: {
                            value: 5,
                            message: "Your Password is short"
                        },
                    })} 
                    placeholder="password" 
                />
                <span>
                    {errors?.password?.message}
                </span>
                <button>Add</button>
            </form>
        </div>
    );
}

// function ToDoList() {
//     const [toDo, setToDo] = useState("");
//     const [toDoError, setToDoError] = useState("");

//     const onChange = (e:React.FormEvent<HTMLInputElement>) => {
//         const {
//             currentTarget : { value },
//         } = e;
//         setToDo(value);
//     };

//     const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         if(toDo.length < 10) {
//             setToDoError("To Do is longer than 10");
//         }else {
//             setToDoError("");
//         }
//         console.log("submit");
//     };

//     return (
//         <div>
//             <form onSubmit={onSubmit}>
//                 <input 
//                     value={toDo} 
//                     onChange={onChange}
//                     placeholder="Write a to do" 
//                 />
//                 <button>Add</button>
//                 {toDoError !== "" ? toDoError : null}
//             </form>
//         </div>
//     );
// }

export default ToDoList;