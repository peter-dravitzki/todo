import { useState } from 'react'
import { Todo } from '../../models/todo'
import useDeleteTodo from '../hooks/useDeleteTodo'
import EditTodo from './EditTodo'

import { updateTodoById } from '../apis/todoApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface Props {
  todos: Todo[]
  allComplete: boolean
}

// 2/ when button in top left is checked it checks all tasks

export default function TodoList({ todos, allComplete }: Props) {
  const [state, setState] = useState(false)
  const deleteTodo = useDeleteTodo()
  const queryClient = useQueryClient()
  const [newTodo, setNewTodo] = useState({
    id: 0,
    task_name: '',
    priority: 0,
    is_completed: false,
  })
  const updateTodoMutation = useMutation({
    mutationFn: (updatedTodo: Todo) =>
      updateTodoById(updatedTodo.id, updatedTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      })
    },
  })

  function handleDelete(id: number, e: { preventDefault: () => void }) {
    e.preventDefault()
    deleteTodo.mutate(`${id}`)

    return
  }

  return (
    <>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={todo.is_completed || allComplete ? 'completed' : ''}
          >
            <input
              id={`${todo.id}`}
              className="toggle"
              type="checkbox"
              checked={todo.is_completed || allComplete}
              onChange={() => {
                newTodo.id = todo.id
                newTodo.priority = todo.priority
                newTodo.task_name = todo.task_name
                newTodo.is_completed = !todo.is_completed
                setNewTodo(newTodo)
                //update todo by id with newTodo
                updateTodoMutation.mutate(newTodo)
              }}
            />
            <label onDoubleClick={() => setState(!state)}>
              {state ? (
                <>
                  <EditTodo id={todo.id} task_name={todo.task_name} />
                </>
              ) : (
                <>{todo.task_name}</>
              )}
            </label>
            <div className="view">
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
// }
// export default function ToDoList({ todos }: Props) {
//   const deleteTodo = useDeleteTodo()
//   const [isEditable, setIsEditable] = useState(false)

//   function handleDelete(id: number, e: { preventDefault: () => void }) {
//     e.preventDefault()
//     deleteTodo.mutate(`${id}`)

//     return
//   }
//   function handleEditClick() {
//     setIsEditable(!isEditable)
//   }
//   return (
//     <>
//       <div>
//         <ul>
//           {todos.map((todo) => (
//             <li key={todo.id}>
//               {isEditable ? (
//                 <EditTodo
//                   id={todo.id}
//                   task_name={todo.task_name}
//                   priority={0}
//                   is_completed={false}
//                 />
//               ) : (
//                 todo.task_name
//               )}
//               <button
//                 className="destroy"
//                 type="submit"
//                 onClick={(e) => handleDelete(todo.id, e)}
//               ></button>
//             </li>
//           ))}
//         </ul>
//         <button type="button" onClick={handleEditClick}>
//           Edit
//         </button>
//       </div>
//     </>
//     // <>
//     //   <input id="toggle-all" className="toggle-all" type="checkbox" />
//     //   <label htmlFor="toggle-all">Mark all as complete</label>
//     //   <ul className="todo-list">
//     //     {todos.map((todo) => (
//     //       <li key={todo.id}>
//     //         <div className="view">
//     //           <input className="toggle" type="checkbox" />
//     //           <label>{todo.task_name}</label>
//     //           <button
//     //             className="destroy"
//     //             type="submit"
//     //             onClick={(e) => handleDelete(todo.id, e)}
//     //           ></button>
//     //         </div>
//     //       </li>
//     //     ))}
//     //   </ul>
//     // </>
//   )
// }
