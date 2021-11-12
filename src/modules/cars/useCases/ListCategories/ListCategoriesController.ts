import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListCategoriesUseCase } from './ListCategoriesUseCase'

export class ListCategoriesController {
  handle(req: Request, res: Response) {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase)

    const categories = listCategoriesUseCase.execute()

    return res.status(200).send(categories)
  }
}
