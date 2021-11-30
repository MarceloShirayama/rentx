import { getRepository, Repository } from 'typeorm'
import { CreateUserTokenDTO } from '../../../dtos/CreateUserTokenDTO'
import { IUsersTokensRepository } from '../../../repositories/IUsersTokensRepository'
import { UserTokens } from '../entities/UserTokens'

export class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>

  constructor() {
    this.repository = getRepository(UserTokens)
  }

  async create(data: CreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create(data)

    await this.repository.save(userToken)

    return userToken
  }
}
