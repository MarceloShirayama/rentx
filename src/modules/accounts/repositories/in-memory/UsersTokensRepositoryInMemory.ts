import {
  CreateUserTokenDTO,
  RequestUserTokensDTo
} from '../../dtos/CreateUserTokenDTO'
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

  async findByUserIdAndRefreshToken(
    data: RequestUserTokensDTo
  ): Promise<UserTokens | undefined> {
    const userToken = this.usersTokens.find((userTokens) => {
      if (
        userTokens.user_id === data.user_id &&
        userTokens.refresh_token === data.refresh_token
      ) {
        return userTokens
      }
      return null
    })

    return userToken
  }

  async deleteById(user_token_id: string): Promise<void> {
    const index = this.usersTokens.findIndex(
      (userToken) => userToken.id === user_token_id
    )

    if (index !== -1) {
      this.usersTokens.splice(index, 1)
    }
  }

  async findByRefreshToken(
    refresh_token: string
  ): Promise<UserTokens | undefined> {
    const userToken = this.usersTokens.find(
      (userToken) => userToken.refresh_token === refresh_token
    )

    return userToken
  }
}
