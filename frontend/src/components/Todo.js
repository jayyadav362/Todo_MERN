import React, { useState, useRef, useEffect } from "react";
import Todolist from "./Todolist";
import axios from "axios";

function Todo() {
  const [newTask, setNewTask] = useState(false);
  const [todo,setTodo] = useState([])
  const [loading,setLoading] = useState(true)
  const titleRef = useRef(null);
  const baseURL = "http://127.0.0.1:8000/api/todo";
  const addNew = () => {
    setNewTask(true);
  };
  const addTask = (e) => {
    setLoading(true)
    e.preventDefault()
    if(!titleRef.current.value){
        setLoading(false)
        alert("Title is required!")
    }else{
        axios
          .post(baseURL, {
            title: titleRef.current.value,
          })
          .then((response) => {
            setLoading(false);
            setNewTask(false);
            titleRef.current.value = null;
          })
          .catch((err) => {
            setLoading(false);
            alert(err.message);
          });
    }
  };
  const cancelTask = () => {
    setNewTask(false);
    titleRef.current.value = null;
  };
  

  useEffect(()=>{
    axios.get(baseURL).then((response) => {
      setTodo(response.data);
      setLoading(false);
    }).catch((err)=>{
        alert(err.message)
        setLoading(false);
    });
  },[loading])

  console.log(todo)
  return (
    <div className="container">
      <div>
        <h3>Todo</h3>
        {!newTask && (
          <button className="btn btn-success" onClick={addNew}>
            +Add New
          </button>
        )}
        {newTask && (
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter title"
                ref={titleRef}
              />
            </div>
            <div className="btn-group mt-2">
              <button className="btn btn-primary" onClick={addTask}>
                Add Task
              </button>
              <button className="btn btn-dark" onClick={cancelTask}>
                Cancel
              </button>
            </div>
          </form>
        )}
        {loading ? (
          <div
            className="d-flex justify-content-center align-content-center align-items-center"
            style={{ minHeight: "550px" }}
          >
            <div
              className="spinner-border text-secondary"
              style={{ width: "5rem", height: "5rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <Todolist todo={todo} setLoading={setLoading} />
        )}
      </div>
    </div>
  );
}

export default Todo;
