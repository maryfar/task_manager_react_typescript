import axios from "axios";
import { newsession } from "../utils/session";


export interface IAddBody{
    title:string;
    description:string;

}

interface IAuthResponse {
    title: string;
    description: string;
    user: {
      id: number;
      username: string;
      password: string;
      tasks:[ {
        id: number;
        title: string;
        description: string;
        isCompleted: boolean;
      }];
      sessions: [{
        id: number;
        token: string;
        expiration: number;
      }];
    };
    id: number;
    isCompleted: boolean;
  }
  

    type AddTaskApiFuncType =(body: IAddBody) =>Promise<IAuthResponse>
    export const AddTaskApi:AddTaskApiFuncType = async(body: IAddBody) =>{
        const response = await axios.post("http://localhost:3000/task",body,{
            headers: {
              Authorization: `Bearer ${newsession.token}`,
            },
          }
        );
        return response.data;
    }     
