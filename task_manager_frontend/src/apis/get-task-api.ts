import axios from "axios";
import { newsession } from "../utils/session";
import { Task } from "../components/showtask";


export interface ITaskResponse{
    id: number;
    username: string;
    password: string;
    tasks:[ {
      id: number;
      title: string;
      description: string;
      isCompleted: boolean;
    }];

}

type GetTaskFuncType = () => Promise<Task>
export const GetTaskFunc:GetTaskFuncType = async ()=>{
    const response = await axios.get("http://localhost:3000/user",{headers:{Authorization:`Bearer ${newsession.token}`}});
    return response.data.tasks

}

