import { Specification } from '../entities/Specification'
import {
  ISpecificationDTO,
  ISpecificationsRepository
} from './ISpecificationsRepository'

export class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[]

  constructor() {
    this.specifications = []
  }

  create({ name, description }: ISpecificationDTO): void {
    const specification = new Specification()

    Object.assign(specification, { name, description })

    this.specifications.push(specification)
  }

  list(): Specification[] {
    return this.specifications
  }

  findByName(name: string): Specification | undefined {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    )

    return specification
  }
}
