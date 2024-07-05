// eslint-disable-next-line no-unused-vars
import { useState } from 'react'
import { addTodo } from '../apis/todoApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'

function AddTodo() {
  const queryClient = useQueryClient()
  const addTodoMutation = useMutation({
    mutationFn: (todo: string) => addTodo(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      })
    },
  })

  const [form, setForm] = useState('')

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setForm(event?.target.value)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    addTodoMutation.mutate(form)
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={(e) => handleChange(e)}
          id="todo"
          name="todo"
          className="new-todo"
          placeholder="What do you need to do?"
          value={form}
        />
        <button>Submit</button>
      </form>
    </>
  )
}

export default AddTodo
