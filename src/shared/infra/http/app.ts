import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { uploadConfig } from '../../../config/upload'
import swaggerFile from '../../../swagger.json'
import { connectionDatabase } from '../typeorm'
import '../../container' // must be below typeorm to load reflect-metadata before
import { AppError } from '../errors/AppError'
import { router } from './routes'
;(async function CreateConnection() {
  await connectionDatabase()
})()

const app = express()

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use('/avatar', express.static(`${uploadConfig.tmpFolder}/avatar`))
app.use('/cars', express.static(`${uploadConfig.tmpFolder}/cars`))

app.use(cors())

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

export { app }
