import { CreateUserDTO } from '../../dtos/CreateUserDTO'
import { User } from '../../infra/typeorm/entities/Users'
import { IUsersRepository } from '../IUsersRepository'

export class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = []

  async create(data: CreateUserDTO): Promise<void> {
    const user = new User()

    Object.assign(user, { ...data })

    this.users.push(user)
  }

  async list(): Promise<User[]> {
    const users = this.users

    return users
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.email === email)

    return user
  }

  async findById(id: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.id === id)

    return user
  }
}
