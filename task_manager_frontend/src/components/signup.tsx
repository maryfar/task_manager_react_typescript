
import { Link, useNavigate } from "react-router-dom";
import { ISignupBody, SignUpApi } from "../apis/auth-apis";
import { newsession } from "../utils/session";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorToast } from "./error";
import { useState } from "react";

let err:string[] | string;

const Schema = yup.object().shape({
  username: yup.string().required("Username is required").min(8),
  password: yup.string().required("Password is required").min(8).max(15)
    .matches(/[a-zA-Z]+/, "Password must contain at least one letter")
    .matches(/[!@#$%^&*]+/, "Password must contain at least one special character !@#$%^&*")
    .matches(/[A-Z]+/, "Password must contain at least one uppercase letter")
});

type SignUpFormValues = {
  username: string;
  password: string;
};

export const SignUpForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<SignUpFormValues>({ resolver: yupResolver(Schema), mode:"all" });
  const [showtoast,setShowToast] = useState(false)

 
  const handleSignUp: SubmitHandler<SignUpFormValues> = async () => {
    const { username, password } = getValues();
    const body: ISignupBody = {
      username: username,
      password: password,
    };
    try {
      const response = await SignUpApi(body);
      console.log(response);
      newsession.setAccessToken(response.token);
      navigate("/main");
    } catch (error) {
      const errors = error as any;
      err= (errors.response?.data).message || null;
      setShowToast(true)
      console.log(errors);
      
    }
  };
  return (
    <>
     {err ?<ErrorToast errorsList={err}  showtoast={showtoast}  setShowToast={setShowToast}/>:null}
   

    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-16 w-16"
          src="/sticky-note.png"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Lets Go!</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          <a href="#" className=" font-medium text-indigo-600 hover:text-indigo-500">
            Start With Sign up
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-6" action="#" method="POST" >
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                User Name
              </label>
              <div className="mt-1">
                <input
                  {...register("username")}
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.username && <p className="text-red-500 text-sm ml-2">{errors.username.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  {...register("password")}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.password && <p className="text-red-500 text-sm ml-2">{errors.password.message}</p>}
              </div>
            </div>



            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <a className="px-2 bg-white text-gray-500 cursor-pointer"><Link to="/">Or Login</Link></a>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
    </>
  )
}



