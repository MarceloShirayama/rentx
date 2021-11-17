import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import swaggerUi from 'swagger-ui-express'
import './database'
import { AppError } from './errors/AppError'
import { router } from './shared/infra/http/routes'
import './shared/container'
import swaggerFile from './swagger.json'

const app = express()
const port = process.env.SERVER_PORT
const project = process.env.PROJECT_NAME

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(router)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message })
  }

  return res.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`
  })
})

app.listen(port, () => {
  return console.log(`${project} run in: http://localhost:${port}`)
})
