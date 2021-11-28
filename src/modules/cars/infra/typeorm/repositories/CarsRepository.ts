import { getRepository, Repository } from 'typeorm'
import { CreateCarDTO } from '../../../dtos/CreateCarDTO'
import {
  availableCarDTO,
  filterCarDTO,
  ICarsRepository
} from '../../../repositories/ICarsRepository'
import { CreateCarSpecificationDTO } from '../../../repositories/ISpecificationsRepository'
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

  async listAvailable(filters: filterCarDTO): Promise<Car[]> {
    const { brand, name, category_id } = filters

    const carsQuery = this.repository
      .createQueryBuilder('cars')
      .where('available = :available', { available: true })

    if (brand) carsQuery.andWhere('cars.brand = :brand', { brand })

    if (name) carsQuery.andWhere('cars.name = :name', { name })

    if (category_id)
      carsQuery.andWhere('cars.category_id = :category_id', { category_id })

    const cars = await carsQuery.getMany()

    return cars
  }

  async findById({
    car_id
  }: CreateCarSpecificationDTO): Promise<Car | undefined> {
    const car = await this.repository.findOne(car_id)

    return car
  }

  async updateAvailable({ car_id, available }: availableCarDTO): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where('id = :id')
      .setParameters({ id: car_id })
      .execute()
  }
}
