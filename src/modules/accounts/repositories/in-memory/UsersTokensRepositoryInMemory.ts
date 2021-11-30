import { CreateUserTokenDTO } from '../../dtos/CreateUserTokenDTO'
import { UserTokens } from '../../infra/typeorm/entities/UserTokens'
import { IUsersTokensRepository } from '../IUsersTokensRepository'

export class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  async create(data: CreateUserTokenDTO): Promise<UserTokens> {
    throw new Error('Method not implemented.')
  }
}
