
import { deleteUserInfoApi } from "../apis/user-api";


interface IDeleteUserInfoFormProps {
    setDeleteConfirm: React.Dispatch<React.SetStateAction<boolean>>;
    username?: string ;
  }


const ConfirmForm = ({ username , setDeleteConfirm }:IDeleteUserInfoFormProps) => {
   

const cancelDeleteHandler=()=>{
    setDeleteConfirm(false);
}

const deleteUserInfo = async () => {
    await deleteUserInfoApi();
    setDeleteConfirm(false);
    window.location.href = "/";
  };


    return (
      <div className="flex flex-col gap-2 item-center border shadow-md rounded-md p-2 z-10 w-1/4 m-1">
        <p>Are you sure Delete This Account with this Username: {username}</p>
        <button
          onClick={deleteUserInfo}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Yes
        </button>
        <button
          onClick={cancelDeleteHandler}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Cancel
        </button>
      </div>
    );
  };
  
  export default ConfirmForm;