import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TodoData } from '../../models/todo'
import { updateTodoById } from '../apis/todoApi'
interface Props {
  id: number
  task_name: string
}

function EditTodo({ id, task_name }: Props) {
  const [newTodo, setNewTodo] = useState<TodoData>({
    task_name: task_name,
    priority: 0,
    is_completed: false,
  })
  const queryClient = useQueryClient()

  const updateTodoMutation = useMutation({
    mutationFn: (updatedTodo: TodoData) => updateTodoById(id, updatedTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      })
    },
  })

  const handleSubmit = (event: React.FormEvent) => {
    // console.log(`submit: `, handleSubmit)
    event.preventDefault()
    updateTodoMutation.mutate(newTodo)
  }
  return (
    <div className="view">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="new-todo"
          value={newTodo.task_name}
          onChange={(e) =>
            setNewTodo({ ...newTodo, task_name: e.target.value })
          }
        />
        <button className="edit" type="submit">
          Update
        </button>
      </form>
    </div>
  )
}

export default EditTodo

// interface Props {
//   id: number
//   task_name: string
//   priority: number
//   is_completed: boolean
// }

// export default function EditTask({ id, task_name }: Props) {
//   const queryClient = useQueryClient()
//   const updateTodoMutation = useMutation({
//     mutationFn: (newTodo: TodoData) => updateTodoById(id, newTodo.task_name),
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ['tasks'],
//       })
//     },
//   })

//   const [list, setList] = useState({
//     task_name: task_name,
//     priority: 0,
//     is_completed: false,
//   })

//   function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
//     setList({ ...list, [event.target.name]: event.target.value })
//   }

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault()
//     updateTodoMutation.mutate(list)
//   }

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <input
//           id="task"
//           name="task"
//           type="text"
//           value={list.task_name}
//           onChange={(e) => handleChange(e)}
//         />
//         <button type="submit">Update</button>
//       </form>
//     </>
//   )
// }
