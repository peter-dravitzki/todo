import { useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchTodoById, updateTodoById } from '../apis/todoApi'
import { Todo } from '../../models/todo'

export default async function useUpdateTodo({
  id,
  task_name,
  priority,
  is_completed,
}: Todo) {
  const queryClient = useQueryClient()
  const todo = await fetchTodoById(`${id}`)
  todo.task_name = task_name
  todo.priority = priority
  todo.is_completed = is_completed

  return useMutation({
    mutationFn: () => updateTodoById(id, todo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      })
    },
  })
}
