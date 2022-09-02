import React, { Fragment as Wrapper, useState, useEffect } from "react";
import ListCard from "./ListCard/ListCard";
import Modal from "./Modal/Modal";
import './App.css';


function App() {
  const [modal, setModal] = useState(false);
  const [taskArr, setTaskArr] = useState(()=>{
    const savedTaskArr = localStorage.getItem('taskArr');
    if(savedTaskArr){
      return JSON.parse(savedTaskArr);
    }
    return [];
  });

  useEffect(()=>{
    localStorage.setItem('taskArr',JSON.stringify(taskArr));
  },[taskArr]);

  const AddItemHandler = () => {
    setModal(true);
  }
  const removeModal = () => {
    setModal(false);
  }

  const pushUp = (data) => {
    setTaskArr(arr => [data, ...arr]);
  }

  const completedTask = (id) => {
    let el = taskArr.find(e => e.id === id);
    taskArr.splice(taskArr.indexOf(el), 1);
    setTaskArr([...taskArr]);
  }

  return (
    <Wrapper>
      <h1>To Do List</h1>
      {modal ? <Modal addElem={pushUp} fun={removeModal} /> : null}
      <button onClick={AddItemHandler} className="AddItemButton">Add New Task</button>
      <ListCard taskHandler={completedTask} listArr={taskArr} />
    </Wrapper>
  );
}

export default App;