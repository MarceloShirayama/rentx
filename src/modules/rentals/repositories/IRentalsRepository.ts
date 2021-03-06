import { RequestRentalDTO } from '../dtos/rentalDTOs'
import { Rental } from '../infra/typeorm/entities/Rental'

export interface IRentalsRepository {
  findOpenRentalByCar(car_id: string): Promise<Rental | undefined>
  findOpenRentalByUser(user_id: string): Promise<Rental | undefined>
  create(data: RequestRentalDTO): Promise<void>
  findById(rental_id: string): Promise<Rental | undefined>
  findByUser(user_id: string): Promise<Rental[]>
}
