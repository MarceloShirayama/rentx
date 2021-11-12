import { Specification } from '../../entities/Specification'
import {
  ISpecificationDTO,
  ISpecificationsRepository
} from '../ISpecificationsRepository'

export class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[]
  private static INSTANCE?: SpecificationsRepository

  private constructor() {
    this.specifications = []
  }

  public static getInstance(): SpecificationsRepository {
    if (!this.INSTANCE) {
      this.INSTANCE = new SpecificationsRepository()
    }

    return this.INSTANCE
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
