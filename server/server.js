import express from 'express'
import * as Path from 'node:path'
import tasks from './routes/beTaskRoutes'

const server = express()

server.use(express.json())
<<<<<<< HEAD:server/server.js
server.use('/api/v1/', tasks)
=======
server.use('/api/v1/todos', tasks)
>>>>>>> todo/main:server/server.ts

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
