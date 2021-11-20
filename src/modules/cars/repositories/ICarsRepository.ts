import { CreateCarDTO } from '../dtos/CreateCarDTO'
import { Car } from '../infra/typeorm/entities/Car'

export type filterCarDTO = {
  name?: string
  brand?: string
  category_id?: string
}

export interface ICarsRepository {
  create(data: CreateCarDTO): Promise<void>
  findByLicensePlate(licensePlate: string): Promise<Car | undefined>
  list(): Promise<Car[]>
  listAvailable(filter: filterCarDTO): Promise<Car[]>
}
