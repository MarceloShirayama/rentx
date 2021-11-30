import { CreateUserTokenDTO } from '../../dtos/CreateUserTokenDTO'
import { UserTokens } from '../../infra/typeorm/entities/UserTokens'
import { IUsersTokensRepository } from '../IUsersTokensRepository'

export class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserTokens[] = []

  async create(data: CreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens()

    Object.assign(userToken, { ...data })

    this.usersTokens.push(userToken)

    return userToken
  }
}
