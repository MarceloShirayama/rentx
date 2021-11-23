import { RequestRentalDTO } from '../../../dtos/rentalDTOs'
import { IRentalsRepository } from '../../../repositories/IRentalsRepository'
import { Rental } from '../entities/Rental'

export class RentalsRepository implements IRentalsRepository {
  async create(data: RequestRentalDTO): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findOpenRentalByCar(car_id: string): Promise<Rental | undefined> {
    throw new Error('Method not implemented.')
  }

  findOpenRentalByUser(user_id: string): Promise<Rental | undefined> {
    throw new Error('Method not implemented.')
  }
}
