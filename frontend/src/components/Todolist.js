import React, { useState } from 'react'
import axios from "axios";
import Edit from './Edit';

function Todolist({todo,setLoading}) {
    const [editShow,setEditShow] = useState([])
    const baseURL = "http://127.0.0.1:8000/api/todo";
    const checkMark = (id) => {
        setLoading(true)
        axios.patch(`${baseURL}/mark/${id}`)
          .then((response) => {
            setLoading(false)
          }).catch((err)=>{
            setLoading(false)
            alert(err.message)
          })
    };
    const deleteTodo = (id) => {
      setLoading(true);
      axios.delete(`${baseURL}/delete/${id}`)
        .then((response) => {
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          alert(err.message);
        });
    };
    const showEditBox = (idx) => {
        if (editShow.includes(idx)) {
            setEditShow(editShow.filter((i) => i !== idx));
        } else {
            setEditShow([...editShow, idx]);
        }
    };

  return (
  <table className="table table-striped mt-5">
    <thead>
        <tr>
            <th>#</th>
            <th>Title</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        {todo.map((todo,idx)=>{
            return (
              <tr key={todo._id}>
                <td>{idx + 1}</td>
                <td>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckChecked"
                      onChange={() => checkMark(todo._id)}
                      checked={todo.completed}
                    />
                    <label
                      className={`form-check-label ${
                        todo.completed ? "text-decoration-line-through" : ""
                      }`}
                      htmlFor="flexCheckChecked"
                    >
                      {todo.title}
                    </label>
                  </div>
                </td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    {editShow.includes(todo._id) ? (
                      <Edit id={todo._id} title={todo.title} setLoading={setLoading}/>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-primary text-light"
                        onClick={() => showEditBox(todo._id)}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => deleteTodo(todo._id)}
                      className="btn btn-danger text-light"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
        })}
    </tbody>
  </table>
  );
}

export default Todolist