import { CreateCarDTO } from '../../dtos/CreateCarDTO'
import { Car } from '../../infra/typeorm/entities/Car'
import { ICarsRepository } from '../ICarsRepository'

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

  async listAvailable(): Promise<Car[]> {
    const cars = this.cars.filter((car) => car.available === true)

    return cars
  }
}
