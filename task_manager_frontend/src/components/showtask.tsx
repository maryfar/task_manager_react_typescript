import { useState } from "react";
import { DeleteUserInfoApi } from "../apis/delete-api";
import { updateDoneTaskStatusApi, updateInprogressTaskStatusApi } from "../apis/updatestatus-api";

export type Task = {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
};

export const ShowTask = ({ tasks, setIsDataUpdated }: { tasks: Task[] | null; setIsDataUpdated: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [completed, setCompleted] = useState(false);

  const handleDeleteTask = async (id: number) => {
    try {
      const response = await DeleteUserInfoApi(id);
      console.log(response);
      setIsDataUpdated((prev) => !prev);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleDoneStatus = async (taskId: number, completed: boolean) => {
    try {
      const response = await updateDoneTaskStatusApi(taskId, completed);
      console.log(response);
      setCompleted((prev) => !prev);
      setIsDataUpdated((prev) => !prev);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleInProgressTaskStatus = async (taskId: number, completed: boolean) => {
    try {
      const response = await updateInprogressTaskStatusApi(taskId, completed);
      console.log(response);
      setCompleted((prev) => !prev);
      setIsDataUpdated((prev) => !prev);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  if (!tasks) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div className="mt-8 flex flex-col m-2">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8 p-2">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg ">
            <table className="min-w-full divide-y divide-gray-300 p-2 ">
              <thead className="bg-gray-50 ">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Title
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Description
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    checkbox
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    State
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:ml-[-150px] ">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{task.title}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{task.description}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <input
                        type="checkbox"
                        checked={task.isCompleted}
                        onChange={() =>
                          task.isCompleted
                            ? handleInProgressTaskStatus(task.id, !task.isCompleted)
                            : handleDoneStatus(task.id, !task.isCompleted)
                        }
                      />
                    </td>
                    <td> { task.isCompleted ? <span className="bg-emerald-500 text-white rounded-lg px-2 py-1" >Done</span>: <span className="bg-red-400 text-white rounded-lg px-2 py-1">Inprogress</span>}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6  gap-2 flex">
                     
                      <a href="#" className="text-indigo-600 hover:text-indigo-900" onClick={() => handleDeleteTask(task.id)}>
                        Delete<span className="sr-only">, {task.title}</span>
                      </a>
                    </td>
                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};