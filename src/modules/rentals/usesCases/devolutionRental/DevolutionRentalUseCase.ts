import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../shared/infra/errors/AppError'
import { dateDiffInDays } from '../../../../utils/date'
import { ICarsRepository } from '../../../cars/repositories/ICarsRepository'
import { Rental } from '../../infra/typeorm/entities/Rental'
import { IRentalsRepository } from '../../repositories/IRentalsRepository'

@injectable()
export class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute(rental_id: string): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(rental_id)

    const car = await this.carsRepository.findById({ car_id: rental?.car_id })

    if (!rental) throw new AppError('Rental does not exists', 404)

    const minimum_daily = 1

    const diffInDaysStartRental = dateDiffInDays(
      new Date(),
      rental?.start_date as Date
    )

    const numberOfDailies =
      diffInDaysStartRental <= minimum_daily
        ? minimum_daily
        : diffInDaysStartRental

    const daysDelay = dateDiffInDays(new Date(), rental.expect_return_date)

    const carFineAmount = car?.fine_amount as number

    let total = daysDelay > 0 ? daysDelay * carFineAmount : 0

    const dailyRate = car?.daily_rate as number

    total += numberOfDailies * dailyRate

    rental.total = total
    rental.end_date = new Date()

    await this.rentalsRepository.create(rental)

    await this.carsRepository.updateAvailable({
      car_id: rental.car_id,
      available: true
    })

    return rental
  }
}
