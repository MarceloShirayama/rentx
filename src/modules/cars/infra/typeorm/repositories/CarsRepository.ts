import { CreateCarDTO } from 'src/modules/cars/dtos/CreateCarDTO'
import { ICarsRepository } from 'src/modules/cars/repositories/ICarsRepository'
import { getRepository, Repository } from 'typeorm'
import { Car } from '../entities/Car'

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car)
  }

  async create(data: CreateCarDTO): Promise<void> {
    const car = this.repository.create({ ...data })

    await this.repository.save(car)
  }

  async findByLicensePlate(licensePlate: string): Promise<Car | undefined> {
    const car = await this.repository.findOne({ license_plate: licensePlate })

    return car
  }
}
