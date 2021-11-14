import { getRepository, Repository } from 'typeorm'
import { ICreateUserDTO } from '../../dtos/ICreateDTO'
import { User } from '../../entities/Users'
import { IUsersRepository } from '../IUsersRepository'

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async create(data: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({ ...data })

    await this.repository.save(user)
  }

  async list(): Promise<User[]> {
    const users = await this.repository.find()

    return users
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ username })

    return user
  }
}
