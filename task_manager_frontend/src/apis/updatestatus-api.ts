import axios from "axios";
import { newsession } from "../utils/session";
export async function updateDoneTaskStatusApi(taskId: number, completed:boolean =true) {
    try {
       const response = await axios.patch(`http://localhost:3000/task/done/${taskId}`, { completed },{headers:{Authorization:`Bearer ${newsession.token}`}});
       console.log(response);
       
    } catch (error) {
      console.error(error);
    }
  }


  export async function updateInprogressTaskStatusApi(taskId: number, completed:boolean =false) {
    try {
       const response = await axios.patch(`http://localhost:3000/task/inprogress/${taskId}`, { completed },{headers:{Authorization:`Bearer ${newsession.token}`}});
       console.log(response);
       
    } catch (error) {
      console.error(error);
    }
  }