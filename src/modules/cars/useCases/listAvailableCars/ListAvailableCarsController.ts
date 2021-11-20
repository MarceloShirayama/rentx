import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { filterCarDTO } from '../../repositories/ICarsRepository'
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase'

export class ListAvailableCarsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { brand, name, category_id }: filterCarDTO = req.query

    const listAvailableCarsUseCase = container.resolve(ListAvailableCarsUseCase)

    const cars = await listAvailableCarsUseCase.execute({
      name,
      brand,
      category_id
    })

    return res.send(cars)
  }
}
