import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateCarUseCase } from './CreateCarUseCase'

export class CreateCarController {
  async handle(req: Request, res: Response) {
    const data = req.body

    const createCarUseCase = container.resolve(CreateCarUseCase)

    await createCarUseCase.execute({ ...data })

    return res.status(201).send()
  }
}
