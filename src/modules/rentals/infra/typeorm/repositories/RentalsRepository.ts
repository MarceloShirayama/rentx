import { getRepository, Repository } from 'typeorm'
import { RequestRentalDTO } from '../../../dtos/rentalDTOs'
import { IRentalsRepository } from '../../../repositories/IRentalsRepository'
import { Rental } from '../entities/Rental'

export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>

  constructor() {
    this.repository = getRepository(Rental)
  }

  async create(data: RequestRentalDTO): Promise<void> {
    const start_date = new Date()
    const rental = this.repository.create({ ...data, start_date })

    await this.repository.save(rental)
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental | undefined> {
    const rental = await this.repository.findOne({
      where: { car_id, end_date: null }
    })

    return rental
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental | undefined> {
    const rental = await this.repository.findOne({
      where: { user_id, end_date: null }
    })

    return rental
  }

  async findById(rental_id: string): Promise<Rental | undefined> {
    const rental = await this.repository.findOne({ id: rental_id })

    return rental
  }
}
