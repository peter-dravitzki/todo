import { Todo } from '../../models/todo'
import { useDeleteTodo } from '../hooks/useTodo'

interface Props {
  todos: Todo[]
}
export default function ToDoList({ todos }: Props) {
  const deleteTodo = useDeleteTodo()

  function handleDelete(id: number, e: { preventDefault: () => void }) {
    e.preventDefault()
    deleteTodo.mutate(id)
    return
  }
  return (
    <>
      <input id="toggle-all" className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            <div className="view">
              <input className="toggle" type="checkbox" />
              <label>{todo.task_name}</label>
              <button
                className="destroy"
                type="submit"
                onClick={(e) => handleDelete(todo.id, e)}
              ></button>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
