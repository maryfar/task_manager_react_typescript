import { useEffect, useState } from "react";
import { IUserInfoResponse, getUserInfoApi } from "../apis/user-api";
import EditUserInfoForm from "./editprofile";
import ConfirmForm from "./confirm";
import { Addtask } from "./addtask";
import { GetTaskFunc } from "../apis/get-task-api";
import { ShowTask, Task } from "./showtask";



export const Main = () => {
  const [userInfo, setUserInfo] = useState<IUserInfoResponse | undefined>();
  const [showform, setshowform] = useState(false);
  const [showaddform, setshowaddform] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [showprofile, setshowprofile] = useState(false)
  const [username, setUsername] = useState("");
  const [tasksData, setTasksData] = useState<Task | null>(null);
  const [isDataUpdated, setIsDataUpdated] = useState(false);

  const handleUserInfoUpdate = (username: string) => {
    setUsername(username);
    setIsDataUpdated((prev) => !prev);
  };

  const showAddFormHandler = () => {
    setshowaddform(true)
    console.log("ddd");

  }
  const showChange = () => {
    setshowprofile(false)
    setshowform(true)
  }
  const showDeleteConfirm = () => {

    setDeleteConfirm(true)
    setshowprofile(false)

  }

  const handelEditButton = () => {
    if (!deleteConfirm) {
      setshowprofile(!showprofile)
    }

  }



  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await getUserInfoApi();
        setUserInfo(userData);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [isDataUpdated]);

  const fetchTasksInfo = async () => {
    try {
      const data = await GetTaskFunc();
      setTasksData(data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    fetchTasksInfo();
  }, [isDataUpdated]);
  return (
    <>
      <div className="flex md:justify-between md:flex-row  flex-col item-start gap-2  m-2 bg-gradient-to-r from-purple-600 to-blue-300 rounded-md text-white p-2">
        <div className="flex gap-1 justify-center items-center">
          {userInfo ? (
            <p>Welcome, {userInfo.username}</p>
          ) : (
            <p>Loading user information...</p>
          )}
          <svg onClick={handelEditButton} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
        </div >
        <div className="flex gap-2 justify-center items-center">
          <div className="rounded-md bg-violet-500 flex gap-1 px-2">
            <svg className="w-6 h-6 cursor-pointer fill-white self-center" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="SearchIcon"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
            <input type="search" className=" bg-violet-500 border-none focus:border-violet-500 focus:ring-0" placeholder="Search"></input>
          </div>

          <svg className="w-6 h-6 cursor-pointer fill-white" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="FilterAltIcon"><path d="M4.25 5.61C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39c.51-.66.04-1.61-.79-1.61H5.04c-.83 0-1.3.95-.79 1.61z"></path></svg>
          <svg onClick={showAddFormHandler} className="w-6 h-6 cursor-pointer fill-white" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AddBoxIcon"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></svg>
        </div>
      </div>
      {showaddform ? <Addtask setshowaddform={setshowaddform} setIsDataUpdated={setIsDataUpdated} /> : null}

      <ShowTask tasks={tasksData} setIsDataUpdated={setIsDataUpdated} />


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

          <div className=" fixed top-16 bg-white left-2 bg-opacity-100 flex flex-col gap-2 item-center border shadow-md rounded-md p-2 z-10 w-1/4 m-1 ">
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
