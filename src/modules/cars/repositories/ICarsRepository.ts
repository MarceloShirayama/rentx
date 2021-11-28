import { CreateCarDTO } from '../dtos/CreateCarDTO'
import { Car } from '../infra/typeorm/entities/Car'
import { CreateCarSpecificationDTO } from './ISpecificationsRepository'

export type filterCarDTO = {
  name?: string
  brand?: string
  category_id?: string
}

export type availableCarDTO = {
  car_id: string
  available: boolean
}

export interface ICarsRepository {
  create(data: CreateCarDTO): Promise<void>
  findByLicensePlate(licensePlate: string): Promise<Car | undefined>
  findById({ car_id }: CreateCarSpecificationDTO): Promise<Car | undefined>
  list(): Promise<Car[]>
  listAvailable(filter: filterCarDTO): Promise<Car[]>
  updateAvailable({ car_id, available }: availableCarDTO): Promise<void>
}
