import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTodoById } from '../apis/todoApi'

export default function useDeleteTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTodoById,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
