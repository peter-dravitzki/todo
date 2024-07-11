import knex from 'knex'
import config from './knexfile.js'
import { TodoData } from '../../models/todo.js'

type Environment = 'production' | 'development' | 'test'
const env = (process.env.NODE_ENV || 'development') as Environment

const connection = knex(config[env])

// Create
export function addTask(todo: TodoData) {
  return connection('todos').insert(todo)
}

// Read all

export function getAllTasks() {
  return connection('todos')
}

// Read by Id
export function getTaskById(id: number) {
  return connection('todos').where({ id }).first()
}

// Update
export function updateTask(id: number, todo: TodoData) {
  return connection('todos')
    .where({ id })
    .update({ ...todo })
}

// Delete
export function deleteTask(id: number) {
  return connection('todos').where({ id }).delete()
}

export default connection
