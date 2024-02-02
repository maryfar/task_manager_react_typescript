import { ChangeEventHandler, useState } from "react";
import { AddTaskApi, IAddBody } from "../apis/addtask-api";
import { AxiosError } from "axios";


interface IDeleteUserInfoFormProps {
    setshowaddform: React.Dispatch<React.SetStateAction<boolean>>;
    setIsDataUpdated: React.Dispatch<React.SetStateAction<boolean>>
  }

export const Addtask = ({setshowaddform , setIsDataUpdated}:IDeleteUserInfoFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

    const cancelAddTask=()=>{
        setshowaddform(false);
    }
    const onChengeTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
        setTitle(e.target.value);
      };
    
      const onChangeDescription: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setDescription(e.target.value);
      };

      const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault(); 
    
        const body: IAddBody = {
          title: title,
          description: description,
        };
        try {
          const response = await AddTaskApi(body);
          console.log(response.user.tasks);
          setIsDataUpdated((prev) => !prev);

        
        } catch (error) {
          const err = error as AxiosError;
          console.log(err);
        }
      };
    

    return (
      <div className="fixed inset-0 items-center justify-center">
        <div className=" w-full h-full bg-gray-900 opacity-95 flex items-center justify-center">
          <div className="bg-white w-1/2 md:max-w-md mx-auto rounded shadow-lg overflow-y-auto z-50 opacity-100  bg-opacity-100">
            <form className="py-4 text-left px-6">
              <h2 className="text-2xl font-semibold mb-4">Add Task</h2>
              <div className="mb-4">
                <label htmlFor="modal-title" className="block  text-sm font-bold mb-2">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  placeholder="Enter title"
                  value ={title}
                  onChange={onChengeTitle}

                />
              </div>
              <div className="mb-4">
                <label htmlFor="modal-description" className="block  text-sm font-bold mb-2">
                  Description
                </label>
                <textarea
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  placeholder="Enter description"
                  value={description}
                  onChange={onChangeDescription}
                ></textarea>
              </div>
  
              <div className="text-right">
                <button onClick={handleAddTask} className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue">
                  Save
                </button>
                <button onClick={cancelAddTask} className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 ml-2 rounded focus:outline-none focus:shadow-outline-gray">
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
        </div>
    );
  };









  // const renderPagination = () => {
  //   return (
  //     <div className="flex justify-center mt-4">
  //       <button
  //         onClick={() => setCurrentPage(currentPage - 1)}
  //         disabled={currentPage === 1}
  //         className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
  //       >
  //         Previous
  //       </button>
  //       <button
  //         onClick={() => setCurrentPage(currentPage + 1)}
  //         disabled={currentPage === totalPages}
  //         className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
  //       >
  //         Next
  //       </button>
  //     </div>
  //   );
  // };