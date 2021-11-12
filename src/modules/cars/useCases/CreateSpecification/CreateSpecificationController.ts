import { Request, Response } from 'express'
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase'

export class CreateSpecificationController {
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}

  handle(req: Request, res: Response) {
    const { name, description } = req.body

    try {
      this.createSpecificationUseCase.execute({ name, description })

      return res.status(201).send()
    } catch (error) {
      const message = (error as Error).message

      return res.status(409).send({ error: message })
    }
  }
}
