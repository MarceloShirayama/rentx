import { getRepository, Repository } from 'typeorm'
import { Specification } from '../../infra/typeorm/entities/Specification'
import {
  ISpecificationDTO,
  ISpecificationsRepository
} from '../ISpecificationsRepository'

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = getRepository(Specification)
  }

  async create({ name, description }: ISpecificationDTO): Promise<void> {
    const specification = await this.repository.create({ name, description })

    await this.repository.save(specification)
  }

  async list(): Promise<Specification[]> {
    const specifications = await this.repository.find()

    return specifications
  }

  findByName(name: string): Promise<Specification | undefined> {
    const specification = this.repository.findOne({ name })

    return specification
  }
}
