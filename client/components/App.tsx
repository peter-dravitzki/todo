import AddTodo from './AddTodo.tsx'
import { fetchTodos } from '../apis/todoApi.ts'
import ToDoList from './TodoList.tsx'
import { useState } from 'react'

function App() {
  const [allComplete, setAllComplete] = useState(false)
  const {
    data: todos,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetchTodos(),
  })

  function handleChange() {
    setAllComplete(!allComplete)
  }

  if (isError) {
    return <>error</>
  }
  if (isFetching) {
    return <p> ..Loading</p>
  }
  if (todos)
    return (
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
    )
}

export default App
