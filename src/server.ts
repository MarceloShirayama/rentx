import express from 'express'
import 'reflect-metadata'
import './database'
import swaggerUi from 'swagger-ui-express'
import './shared/container'
import { router } from './routes'
import swaggerFile from './swagger.json'

const app = express()
const port = process.env.SERVER_PORT
const project = process.env.PROJECT_NAME

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(router)

app.listen(port, () => {
  return console.log(`${project} run in: http://localhost:${port}`)
})
