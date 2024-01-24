import axios from "axios";
import { newsession } from "../utils/session";


export const DeleteUserInfoApi = async(id:number) =>{
    const response = await axios.delete(`http://localhost:3000/task/${id}`,{headers:{Authorization:`Bearer ${newsession.token}`}})
return response.data;
}
