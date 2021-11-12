import express from 'express'
import 'reflect-metadata'
import './shared/container'
import { router } from './routes'

const app = express()
const port = process.env.SERVER_PORT
const project = process.env.PROJECT_NAME

app.use(express.json())

app.use(router)

app.listen(port, () => {
  return console.log(`${project} run in: http://localhost:${port}`)
})
