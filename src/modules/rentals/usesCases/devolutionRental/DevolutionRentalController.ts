import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DevolutionRentalUseCase } from './DevolutionRentalUseCase'

export class DevolutionRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: rental_id } = req.params
    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase)

    const rental = await devolutionRentalUseCase.execute(rental_id)

    return res.status(200).json(rental)
  }
}
