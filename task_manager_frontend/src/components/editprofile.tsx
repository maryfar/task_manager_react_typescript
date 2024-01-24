import { ChangeEventHandler, useState } from "react";
import { IUserPutBody, editUserInfoApi } from "../apis/user-api";
import { AxiosError } from "axios";

interface EditUserInfoFormProps {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  username: string ;
  handleUserInfoUpdate: (username: string) => void;
  setUsername: React.Dispatch<React.SetStateAction<string>>
}
const EditUserInfoForm = ({ showForm, setShowForm , username,setUsername ,  handleUserInfoUpdate}:EditUserInfoFormProps) => {
  
  const [password, setPassword] = useState("");

  const onChangeUsername: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

const handelEdit = async(e:React.FormEvent) =>{
  e.preventDefault();
  const body:IUserPutBody ={
    username: username,
    password:password,
  };
  try {
  const response = await editUserInfoApi(body);
  console.log(response.password);
 
  handleUserInfoUpdate(response.username);
  setShowForm(false);

}catch (error) {
  const err = error as AxiosError;
  console.log(err);
}
};


  const onClickClose = () => {
    setShowForm(false);
   
  };

  if (!showForm) {
    return (
      <div>
        <button
          onClick={() => setShowForm(true)}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Edit User Info
        </button>
      </div>
    );
  }

  return (
    <form className="fixed top-16 bg-white left-2 bg-opacity-100 flex flex-col gap-2 item-center border shadow-md rounded-md p-2 z-10 w-1/4 m-1 " action="#" method="POST" onSubmit={handelEdit}>
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          User Name
        </label>
        <div className="mt-1">
          <input
            id="username"
            name="username"
            type="text"
            onChange={onChangeUsername}
            value={username}
            autoComplete="username"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            onChange={onChangePassword}
            value={password}
            autoComplete="current-password"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Edit
        </button>

        <button
          onClick={onClickClose}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditUserInfoForm;