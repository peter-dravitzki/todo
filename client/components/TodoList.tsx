import { Todo } from '../../models/todo'
import { useDeleteTodo } from '../hooks/useTodo'

interface Props {
  todos: Todo[]
}
export default function ToDoList({ todos }: Props) {
  const deleteTodo = useDeleteTodo()

  const handleDelete = async (
    id: number,
    e: { preventDefault: () => void },
  ) => {
    e.preventDefault()
    deleteTodo.mutate(id)
  }
  return (
    <>
      <div>ToDoList</div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.task_name}{' '}
            <button
              className="delete-btn"
              onClick={(e) => handleDelete(todo.id, e)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}
