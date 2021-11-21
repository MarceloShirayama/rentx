import { Specification } from '../infra/typeorm/entities/Specification'

export type CreateCarSpecificationDTO = {
  car_id?: string
  specification_id?: string[]
}

export interface ISpecificationDTO {
  name: string
  description: string
}

export interface ISpecificationsRepository {
  create({ name, description }: ISpecificationDTO): Promise<void>
  list(): Promise<Specification[]>
  findByName(name: string): Promise<Specification | undefined>
  findByIds(ids: string[]): Promise<Specification[]>
}
