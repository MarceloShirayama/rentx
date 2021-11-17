import { getRepository, Repository } from 'typeorm'
import { CreateUserDTO } from '../../../dtos/CreateUserDTO'
import { User } from '../entities/Users'
import { IUsersRepository } from '../../../repositories/IUsersRepository'

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async create(data: CreateUserDTO): Promise<void> {
    const user = this.repository.create({ ...data })

    await this.repository.save(user)
  }

  async list(): Promise<User[]> {
    const users = await this.repository.find()

    return users
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ email })

    return user
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne(id)

    return user
  }
}
