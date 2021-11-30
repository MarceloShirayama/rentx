import {
  CreateUserTokenDTO,
  RequestUserTokensDTo
} from '../dtos/CreateUserTokenDTO'
import { UserTokens } from '../infra/typeorm/entities/UserTokens'

export interface IUsersTokensRepository {
  create(data: CreateUserTokenDTO): Promise<UserTokens>
  findByUserIdAndRefreshToken(
    data: RequestUserTokensDTo
  ): Promise<UserTokens | undefined>
  deleteById(user_token_id: string): Promise<void>
}
