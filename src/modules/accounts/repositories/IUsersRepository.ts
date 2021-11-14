import { CreateUserDTO } from '../dtos/CreateUserDTO'
import { User } from '../entities/Users'

export interface IUsersRepository {
  create(data: CreateUserDTO): Promise<void>
  list(): Promise<User[]>
  findByEmail(email: string): Promise<User | undefined>
}
