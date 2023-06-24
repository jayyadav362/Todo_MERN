import React,{useRef} from 'react'
import axios from "axios";

function Edit({id,title,setLoading}) {
    const baseURL = "http://127.0.0.1:8000/api/todo";
    const titleRef = useRef(null);
    const updateTodo=(id)=>{
        setLoading(true)
        axios.put(`${baseURL}/update/${id}`,{title:titleRef.current.value})
          .then((response) => {
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            alert(err.message);
          });
    }
  return (
    <div className='btn-group'>
      <input ref={titleRef} defaultValue={title} className='form-control' />
      <button onClick={() => updateTodo(id)} className='btn btn-primary'>Update</button>
    </div>
  );
}

export default Edit