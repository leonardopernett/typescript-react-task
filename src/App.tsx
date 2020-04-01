import React, { Fragment, useState, useRef } from "react";

import "./App.css";

interface ITask {
  name: string;
  done: boolean;
}

type formElement = React.FormEvent<HTMLFormElement>;

function App(): JSX.Element {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);

  const inputFocus = useRef<HTMLInputElement>(null)

  const handlerSubmit = (e: formElement) => {
    e.preventDefault();
    addTask(task);
    setTask("");
    inputFocus.current?.focus();
  }

  const addTask = (task: string) => {
    const newTask: ITask[] = [...tasks, { name: task, done: false }];
    setTasks(newTask);
  }


  const toggleTask = (i:number) => {
     const newTask = [...tasks];
     newTask[i].done = !newTask[i].done
     setTasks(newTask)
  };

  const removeTask = (i:number): void =>{
     const newTask =  [...tasks]
     newTask.splice(i,1)
     setTasks(newTask)
  }

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card mt-5">
              <div className="card-body">
                <form onSubmit={handlerSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      ref={inputFocus}
                      value={task}
                      onChange={e => setTask(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-primary btn-block">save</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mx-auto">
            {tasks.map((task, i) => (
              <div className="card my-1" key={i}>
                <div className="card-body text-center">
                  <h2
                    style={{ textDecoration: task.done ? "line-through" : "" }}
                  >
                    {task.name}
                  </h2>
                  <p>{task.done + ""}</p>
                  <button 
                  onClick={()=>toggleTask(i)}
                  className="btn btn-secondary">
                    {task.done ? "✓" : "✗"}
                  </button>
                  <button onClick={()=>removeTask(i)}>
                     <i className="fa fa-trash-o"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
