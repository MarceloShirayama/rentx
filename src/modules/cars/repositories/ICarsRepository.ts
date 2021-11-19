import { CreateCarDTO } from '../dtos/CreateCarDTO'
import { Car } from '../infra/typeorm/entities/Car'

export interface ICarsRepository {
  create(data: CreateCarDTO): Promise<void>
  findByLicensePlate(licensePlate: string): Promise<Car | undefined>
  list(): Promise<Car[]>
}
