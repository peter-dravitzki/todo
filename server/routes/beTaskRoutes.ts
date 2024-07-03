import { Router } from 'express'
import * as db from '../db/connection'

const router = Router()

//Create
router.post('/', async (req, res) => {
  try {
    const newTask = req.body
    await db.addTask(newTask)
    res.sendStatus(201)
  } catch (error) {
    console.error(error)
  }
})

//Read all

router.get('/', async (req, res) => {
  try {
    const list = await db.getAllTasks()
    res.json(list)
  } catch (error) {
    console.error(error)
  }
})

//Read By Id
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const task = await db.getTaskById(id)
    res.json(task)
  } catch (error) {
    console.error(error)
  }
})

//Update
router.patch('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const task = req.body
    const count = await db.updateTask(id, task)
    res.json(count)
  } catch (error) {
    console.error(error)
  }
})

//Delete
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    await db.deleteTask(id)
    res.sendStatus(200)
  } catch (error) {
    console.error(error)
  }
})

export default router
