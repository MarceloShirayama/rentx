import { RequestRentalDTO } from '../../dtos/rentalDTOs'
import { Rental } from '../../infra/typeorm/entities/Rental'
import { IRentalsRepository } from '../IRentalsRepository'

export class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = []

  async create(data: RequestRentalDTO): Promise<void> {
    const rental = new Rental()

    Object.assign(rental, { ...data, start_date: new Date() })

    this.rentals.push(rental)
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental | undefined> {
    const rental = this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    )

    return rental
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental | undefined> {
    const rental = this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    )

    return rental
  }
}
