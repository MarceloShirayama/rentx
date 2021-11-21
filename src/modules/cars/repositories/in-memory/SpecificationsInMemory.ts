import { Specification } from '../../infra/typeorm/entities/Specification'
import {
  ISpecificationDTO,
  ISpecificationsRepository
} from '../ISpecificationsRepository'

export class SpecificationsInMemory implements ISpecificationsRepository {
  specifications: Specification[] = []

  async create({ name, description }: ISpecificationDTO): Promise<void> {
    const specification = new Specification()

    Object.assign(specification, { name, description })

    this.specifications.push(specification)
  }

  async list(): Promise<Specification[]> {
    const specifications = this.specifications

    return specifications
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    )

    return specification
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = this.specifications.filter((specification) => {
      if (specification.id && ids.includes(specification.id)) {
        return specification
      }

      return null
    })

    return specifications
  }
}
