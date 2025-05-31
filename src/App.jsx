import { React, useState, useEffect } from "react";
import "./App.css";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { getDatabase, ref, set, push, onValue, remove } from "firebase/database";
import { FaTrash } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";



function App() {
  const [task,setTask] = useState("");
  const [editTask,setEditTask] = useState("");
  const [taskErr,setTaskErr] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [edit,setEdit] = useState(false);
  const [id,setID] = useState(1);


  const notify = () => {
    task == ""
      ? toast.error(taskErr == "" ?  "please enter something": taskErr, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
          className: "!bg-gray-800 !text-gray-100",
        })
      : toast.success("Submit Succesfull!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
          className: "!bg-gray-800 !text-gray-100",
        });
    }


  const handleTask = (e)=>{
    e.preventDefault();
    setTask(e.target.value);
    setTaskErr("")
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if(task == ""){
      setTaskErr("please enter something");
      notify();
    }else{
      // console.log(task);
      const db = getDatabase();
      set(push(ref(db, "todo/")), {
        todoname: task,
      }).then(()=>{
        notify()
        setTask("")
      })
    }

  };

  useEffect(() => {
    const db = getDatabase();
    const todoRef = ref(db, "todo/");
    onValue(todoRef, (snapshot) => {
      // const data = snapshot.val();
      const Arr = []
      snapshot.forEach((item)=>{
        Arr.push({value:item.val(), id:item.key})
      })
      setAllTodos(Arr)  
    });
  },[])

  
  const  handleDelete =  (id) =>{
    const db =  getDatabase();
    remove(ref(db, "todo/" + id)).then(() => {
      toast.error("task has deleted", {
        icon: <FaTrash className="text-[#E74D3C]" />,
        theme: "dark",
        autoClose: 2000,
        className: "!bg-gray-800 !text-gray-100",
      });
    });

  }
  const handleEditBtn = (id, value) => {
    setEdit(!edit);
    setID(id);
    setEditTask(value);
  }

  const handleUpdate = () => {
    console.log(allTodos[id].value.todoname);
    
  }

  return (
    <>
      <form
        className="max-w-sm mx-auto mt-5 border border-gray-50 p-5 rounded-lg"
        onSubmit={handleSubmit}
      >
        <ToastContainer />
        <div className="mb-5">
          <label
            htmlFor="text"
            className="block mb-2 text-sm font-medium text-gray-100 "
          >
            Your Task
          </label>
          {!edit ? (
            <input
              value={task}
              onChange={handleTask}
              type="text"
              id="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Your task here"
            />
          ) : (
            <input
              value={editTask}
              onChange={(e) => setEditTask(e.target.value)}
              type="text"
              id="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Update Your task here"
            />
          )}
        </div>
        {!edit ? (
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleSubmit}
          >
            Add Task
          </button>
        ) : (
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={(id) => handleUpdate(id)}
          >
            Update Task
          </button>
        )}

        <ul className="max-w-md space-y-1  list-disc list-inside mt-4 bg-gray-700 text-white rounded-lg">
          {allTodos.map((item, index) => (
            <li
              key={index}
              className="text-white w-full flex justify-between items-center  p-4"
            >
              {item.value.todoname}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className=""
                >
                  <FaTrash className="text-[#E74D3C]" />
                </button>
                <button
                  type="button"
                  onClick={() => handleEditBtn(index, item.value.todoname)}
                  className=""
                >
                  <FaRegEdit className="text-green-600" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </form>
    </>
  );
}

export default App;
