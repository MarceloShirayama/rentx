import { CreateUserTokenDTO } from '../dtos/CreateUserTokenDTO'
import { UserTokens } from '../infra/typeorm/entities/UserTokens'

export interface IUsersTokensRepository {
  create(data: CreateUserTokenDTO): Promise<UserTokens>
}
