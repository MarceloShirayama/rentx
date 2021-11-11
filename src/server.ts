import express from 'express'
import { categoriesRoutes } from './routes/categories.routes'
import { specificationsRoutes } from './routes/specifications.routes'

const app = express()
const port = process.env.SERVER_PORT
const project = process.env.PROJECT_NAME

app.use(express.json())

app.use('/categories', categoriesRoutes)
app.use('/specifications', specificationsRoutes)

app.listen(port, () => {
  return console.log(`${project} run in: http://localhost:${port}`)
})
