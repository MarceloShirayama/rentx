import { ICreateUserDTO } from '../dtos/ICreateDTO'
import { User } from '../entities/Users'

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>
  list(): Promise<User[]>
  findByUsername(username: string): Promise<User | undefined>
}
