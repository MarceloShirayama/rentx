import { getRepository, Repository } from 'typeorm'
import { CreateCarDTO } from '../../../dtos/CreateCarDTO'
import { ICarsRepository } from '../../../repositories/ICarsRepository'
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

  list(): Promise<Car[]> {
    const cars = this.repository.find()

    return cars
  }
}
