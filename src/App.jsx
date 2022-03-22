import React, { useState } from "react";
import { Header, Body, TaskItem, InputSearch, NotTasks } from './components/index'
import { v4 as uuid } from 'uuid'

function App() {
  const [tasks, setTasks] = useState([
    { id: uuid(), text: 'Terminar la app todo', completed: true },
    { id: uuid(), text: 'Asistir a las clases', completed: false },
    { id: uuid(), text: 'Crear una nueva repo', completed: false }
  ])
  const [searchValue, setSearchValue] = useState('')
  let searchedTasks = []

  if (!searchValue.length >= 1) {
    searchedTasks = tasks
  } else {
    searchedTasks = tasks.filter(task => {
      const searchTextLower = searchValue.toLowerCase()
      const taskText = task.text.toLowerCase()

      return taskText.includes(searchTextLower)
    })
  }

  const onCheck = id => {
    // capturar la task, luego cambiar el estado de ese objeto en su propiedad completed
    const i = tasks.findIndex(task => task.id === id)
    const newTodos = [...tasks]
    newTodos[i].completed = true
    setTasks(newTodos)
    console.log(tasks)
  }

  return (
    <>
      <Header>
        <InputSearch
          searchedTasks={searchedTasks}
          setTasks={setTasks}
          setSearchValue={setSearchValue}
        />
      </Header>
      {
        tasks.length === 0
          ? <NotTasks />
          : <Body>
            <div className="body--tasks-containter">
              {
                searchedTasks.map(task => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onCheck={() => onCheck(task.id)}
                  />
                ))
              }
            </div>
          </Body>
      }
    </>
  );
}

export default App;
