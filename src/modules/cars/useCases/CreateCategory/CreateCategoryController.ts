import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'

export class CreateCategoryController {
  async handle(req: Request, res: Response) {
    const { name, description } = req.body

    try {
      const createCategoryUseCase = container.resolve(CreateCategoryUseCase)
      await createCategoryUseCase.execute({ name, description })

      return res.status(201).send()
    } catch (error) {
      const message = (error as Error).message

      return res.status(409).send({ error: message })
    }
  }
}
