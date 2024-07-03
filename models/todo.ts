export interface TodoData {
  task_name: string
  priority: number
  is_completed: boolean
}
export interface Todo extends TodoData {
  id: number
}
