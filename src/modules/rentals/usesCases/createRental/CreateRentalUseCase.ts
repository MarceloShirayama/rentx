import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../shared/infra/errors/AppError'
import { dateDiffInHours } from '../../../../utils/date'
import { RequestRentalDTO } from '../../dtos/rentalDTOs'
import { IRentalsRepository } from '../../repositories/IRentalsRepository'

const minimumRentalHours = 24

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository
  ) {}

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

    const expectedReturnInHours = dateDiffInHours(
      data.expect_return_date,
      new Date()
    )

    if (expectedReturnInHours < minimumRentalHours)
      throw new AppError(
        'The car rental must have a minimum duration of 24 hours.'
      )

    await this.rentalsRepository.create(data)
  }
}
