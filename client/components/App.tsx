import { useQuery } from '@tanstack/react-query'
import AddTodo from './AddTodo.tsx'
import { fetchTodos } from '../apis/todoApi.ts'
import ToDoList from './TodoList.tsx'
<<<<<<< HEAD

function App() {
=======
import { useState } from 'react'

function App() {
  const [allComplete, setAllComplete] = useState(false)
>>>>>>> todo/main
  const {
    data: todos,
    isFetching,
    isError,
<<<<<<< HEAD
    error,
=======
>>>>>>> todo/main
  } = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetchTodos(),
  })
<<<<<<< HEAD
  if (isError) {
    return error
=======

  function handleChange() {
    setAllComplete(!allComplete)
  }

  if (isError) {
    return <>error</>
>>>>>>> todo/main
  }
  if (isFetching) {
    return <p> ..Loading</p>
  }
  if (todos)
    return (
<<<<<<< HEAD
      <>
        <header className="header">
          <h1>todos</h1>
          <AddTodo />
          <ToDoList todos={todos} />
        </header>
        <section className="main"></section>
        <footer className="footer"></footer>
      </>
=======
      <div>
        <header className="header">
          <h1>To Do List</h1>
          <AddTodo />
        </header>
        <div className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            checked={allComplete}
            onChange={handleChange}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ToDoList todos={todos} allComplete={allComplete} />
        </div>

        <footer className="footer"></footer>
      </div>
>>>>>>> todo/main
    )
}

export default App
