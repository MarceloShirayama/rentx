import { CreateCarDTO } from '../../dtos/CreateCarDTO'
import { Car } from '../../infra/typeorm/entities/Car'
import {
  availableCarDTO,
  filterCarDTO,
  ICarsRepository
} from '../ICarsRepository'
import { CreateCarSpecificationDTO } from '../ISpecificationsRepository'

export class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = []

  async create(data: CreateCarDTO): Promise<void> {
    const car = new Car()

    Object.assign(car, { ...data })

    this.cars.push(car)
  }

  async findByLicensePlate(licensePlate: string): Promise<Car | undefined> {
    const car = this.cars.find((car) => car.license_plate === licensePlate)

    return car
  }

  async list(): Promise<Car[]> {
    const cars = this.cars

    return cars
  }

  async listAvailable(filters: filterCarDTO): Promise<Car[]> {
    const { name, brand, category_id } = filters
    const existFilter = !!name || brand || category_id

    // TODO: improve the code by refactoring various ifs
    const cars = this.cars
      .filter((car) => car.available === true)
      .filter((car) => {
        if (!!category_id && car.category_id === category_id) return car
        if (!!brand && car.brand === brand) return car
        if (!!name && car.name === name) return car
        if (existFilter) return null
        return car
      })

    return cars
  }

  async findById({
    car_id
  }: CreateCarSpecificationDTO): Promise<Car | undefined> {
    const car = this.cars.find((car) => car.id === car_id)

    return car
  }

  async updateAvailable({ car_id, available }: availableCarDTO): Promise<void> {
    const carIndex = this.cars.findIndex((car) => car.id === car_id)

    if (carIndex !== -1) this.cars[carIndex].available = available
  }
}
