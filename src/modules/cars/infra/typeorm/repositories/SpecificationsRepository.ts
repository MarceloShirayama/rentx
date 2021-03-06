import { getRepository, Repository } from 'typeorm'
import { Specification } from '../entities/Specification'
import {
  ISpecificationDTO,
  ISpecificationsRepository
} from '../../../repositories/ISpecificationsRepository'

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = getRepository(Specification)
  }

  async create({ name, description }: ISpecificationDTO): Promise<void> {
    const specification = this.repository.create({ name, description })

    await this.repository.save(specification)
  }

  async list(): Promise<Specification[]> {
    const specifications = await this.repository.find()

    return specifications
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const specification = await this.repository.findOne({ name })

    return specification
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.findByIds(ids)

    return specifications
  }
}
