import  { useEffect, useState } from "react";
import { IUserInfoResponse, getUserInfoApi} from "../apis/user-api";
import EditUserInfoForm from "./editprofile";
import ConfirmForm from "./confirm";



export const Main = () => {
  const [userInfo, setUserInfo] = useState<IUserInfoResponse | undefined>(); 
  const [showform, setshowform] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [showprofile, setshowprofile] = useState(false)
  const [username, setUsername] = useState("");

  const handleUserInfoUpdate = (username: string) => {
    setUsername(username);
  };

 const showChange = ()=>{
    setshowform(true)
 }
 const showDeleteConfirm = ()=>{
 
  setDeleteConfirm(true)
  setshowprofile(false)

}

 const handelEditButton = ()=>{
  if(!deleteConfirm){
    setshowprofile(!showprofile)
  }
  
 }
 


  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await getUserInfoApi();
        setUserInfo(userData);
        setUsername(userData.username);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [userInfo?.username]);

  return (
    <>
    <div className="flex gap-1">
      {userInfo ? (
        <p>Welcome, {userInfo.username}</p>
      ) : (
        <p>Loading user information...</p>
      )}
      <svg  onClick={handelEditButton} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>

    </div>
    {showform ? (
  <EditUserInfoForm
    showForm={showform}
    setShowForm={setshowform}
    username={username}
    setUsername={setUsername}
    handleUserInfoUpdate={handleUserInfoUpdate}
  />
) : (
  
  showprofile ? (
   
    <div className="flex flex-col gap-2 item-center border shadow-md rounded-md p-2 z-10 w-1/4 m-1 ">
      <p>Edit Or Delete Account</p>
      <button
        onClick={showChange}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Edit User Info
      </button>
      <button
        onClick={showDeleteConfirm}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Delete This Account
      </button>
    </div>
  ) : null 
)}

{deleteConfirm ? (
  <ConfirmForm
    username={userInfo?.username}
    setDeleteConfirm={setDeleteConfirm}
  />
) : null}
    </>
  );
};
