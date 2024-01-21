import axios from "axios";
import { newsession } from "../utils/session";



// ---------------------------------------------getUser----------------------------------------

export interface IUserInfoResponse {
    id: number;
    username: string;
}

type getUserinfoFunType = () => Promise <IUserInfoResponse>;
export const getUserInfoApi :getUserinfoFunType = async() =>{
    const response = await axios.get("http://localhost:3000/user",{headers:{Authorization:`Bearer ${newsession.token}`}})
return response.data;
}


// ------------------------------------------put_for_edit----------------------------------------

export interface IUserPutBody {
    username:string;
    password:string;
  }

  type editUserInfoFuncType = (body: IUserPutBody) => Promise<IUserPutBody>;

  export const editUserInfoApi: editUserInfoFuncType = async (body) => {
    const response = await axios.put("http://localhost:3000/user", body, {
      headers: {
        Authorization: `Bearer ${newsession.token}`,
      },
    });
    return response.data;
  };

// ------------------------------------------delete_user----------------------------------------



export const deleteUserInfoApi = async() =>{
    const response = await axios.delete("http://localhost:3000/user",{headers:{Authorization:`Bearer ${newsession.token}`}})
return response.data;
}

