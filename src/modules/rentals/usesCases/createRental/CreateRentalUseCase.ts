import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../shared/infra/errors/AppError'
import { dateDiffInHours } from '../../../../utils/date'
import { ICarsRepository } from '../../../cars/repositories/ICarsRepository'
import { RequestRentalDTO } from '../../dtos/rentalDTOs'
import { IRentalsRepository } from '../../repositories/IRentalsRepository'

const minimumRentalHours = 24

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    car_id,
    user_id,
    expect_return_date
  }: RequestRentalDTO): Promise<void> {
    const car = await this.carsRepository.findById({ car_id })

    if (!car) throw new AppError('Car not found', 409)

    const unavailableCar = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    )

    if (unavailableCar) throw new AppError('Car is unavailable', 401)

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    )

    if (rentalOpenToUser)
      throw new AppError('Already exists open rental to user', 401)

    const expectedReturnInHours = dateDiffInHours(
      expect_return_date,
      new Date()
    )

    if (expectedReturnInHours < minimumRentalHours)
      throw new AppError(
        'The car rental must have a minimum duration of 24 hours.'
      )

    await this.rentalsRepository.create({
      car_id,
      user_id,
      expect_return_date
    })

    await this.carsRepository.updateAvailable({ car_id, available: false })
  }
}
