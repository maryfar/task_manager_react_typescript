import axios from "axios";


export interface ISignupBody {
    username:string;
    password:string;
}

interface IAuthResponse {
    user: {
      username: string;
      id: number;
    };
    token: string;
  }
type SignUpApiFuncType =(body: ISignupBody) =>Promise<IAuthResponse>
export const SignUpApi:SignUpApiFuncType = async(body: ISignupBody) =>{
    const response = await axios.post("http://localhost:3000/auth/signup",body);
    return response.data;
} 


export interface ILoginBody {
  username:string;
  password:string;
}

type LoginApiFuncType = (body:ILoginBody) => Promise<IAuthResponse>
export const LoginApi:LoginApiFuncType = async(body: ILoginBody)=>{
  const response = await axios.post("http://localhost:3000/auth/login",body);
  return response.data
}

