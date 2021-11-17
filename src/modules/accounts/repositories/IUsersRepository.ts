import { CreateUserDTO } from '../dtos/CreateUserDTO'
import { User } from '../infra/typeorm/entities/Users'

export interface IUsersRepository {
  create(data: CreateUserDTO): Promise<void>
  list(): Promise<User[]>
  findByEmail(email: string): Promise<User | undefined>
  findById(id: string): Promise<User | undefined>
}
