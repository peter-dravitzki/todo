import { Todo } from '../../models/todo'

interface Props {
  todos: Todo[]
}
export default function ToDoList({ todos }: Props) {
  return (
    <>
      <div>ToDoList</div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.task_name}</li>
        ))}
      </ul>
    </>
  )
}
