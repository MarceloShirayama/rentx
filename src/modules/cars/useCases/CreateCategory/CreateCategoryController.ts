import { Request, Response } from 'express'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'

export class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  handle(req: Request, res: Response) {
    const { name, description } = req.body

    try {
      this.createCategoryUseCase.execute({ name, description })

      return res.status(201).send()
    } catch (error) {
      const message = (error as Error).message

      return res.status(409).send({ error: message })
    }
  }
}
