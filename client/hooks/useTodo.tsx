import { useMutation, useQueryClient } from '@tanstack/react-query'
import superagent from 'superagent'

export function useDeleteTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      await superagent.delete(`/api/v1/todos/${id}`)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
