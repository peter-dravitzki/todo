import request from 'superagent'
import { Todo, TodoData } from '../../models/todo'

const rootUrl = '/api/v1'
//Create new Todo
export async function addTodo(todo: string) {
  const newTask: TodoData = {
    task_name: todo,
    priority: 0,
    is_completed: false,
  }
  await request.post(rootUrl).send(newTask)
}
//Read All todos
export async function fetchTodos(): Promise<Todo[]> {
  const res = await request.get(rootUrl)
  return res.body
}
//Read single todo by id
export async function fetchTodoById(id: string): Promise<Todo> {
  const res = await request.get(`${rootUrl}/${id}`)
  return res.body
}

//Update single todo by id
export async function updateTodoById(updatedTodo: string, id: number) {
  await request.patch(`${rootUrl}/${id}`).send(updatedTodo)
}
//delete single todo by id
export async function deleteTodoById(id: string): Promise<Todo> {
  const res = await request.delete(`${rootUrl}/${id}`)
  return res.body
}
