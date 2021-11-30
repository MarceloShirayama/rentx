import { getRepository, Repository } from 'typeorm'
import {
  CreateUserTokenDTO,
  RequestUserTokensDTo
} from '../../../dtos/CreateUserTokenDTO'
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

  async findByUserIdAndRefreshToken(
    data: RequestUserTokensDTo
  ): Promise<UserTokens | undefined> {
    const { user_id, refresh_token } = data
    const userToken = await this.repository.findOne({
      user_id,
      refresh_token
    })

    return userToken
  }

  async deleteById(user_token_id: string): Promise<void> {
    await this.repository.delete({ id: user_token_id })
  }
}
