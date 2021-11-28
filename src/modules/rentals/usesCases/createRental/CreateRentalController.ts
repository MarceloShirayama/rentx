import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { RequestRentalDTO } from '../../dtos/rentalDTOs'
import { CreateRentalUseCase } from './CreateRentalUseCase'

export class CreateRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { expect_return_date, car_id }: RequestRentalDTO = req.body
    const { id } = req.user

    const createRentalUseCase = container.resolve(CreateRentalUseCase)

    try {
      await createRentalUseCase.execute({
        user_id: id,
        car_id,
        expect_return_date
      })

      return res.status(201).send()
    } catch (error) {
      return res.send(error)
    }
  }
}
