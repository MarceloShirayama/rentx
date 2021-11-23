import { AppError } from '../../../../shared/infra/errors/AppError'
import { RequestRentalDTO } from '../../dtos/rentalDTOs'
import { IRentalsRepository } from '../../repositories/IRentalsRepository'

export class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

  async execute(data: RequestRentalDTO): Promise<void> {
    const unavailableCar = await this.rentalsRepository.findOpenRentalByCar(
      data.car_id
    )

    if (unavailableCar) throw new AppError('Car is unavailable', 401)

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      data.user_id
    )

    if (rentalOpenToUser)
      throw new AppError('Already exists open rental to user', 401)

    await this.rentalsRepository.create(data)
  }
}
