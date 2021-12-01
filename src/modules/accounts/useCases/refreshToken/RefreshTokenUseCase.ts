import { sign, verify } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository'
import { refreshTokenConfig } from '../../../../config/auth'
import { AppError } from '../../../../shared/infra/errors/AppError'
import { addHoursInCurrentDate } from '../../../../utils/date'
import { RefreshTokenPayloadDTO } from '../../dtos/CreateUserTokenDTO'

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository
  ) {}

  async execute(refresh_token: string): Promise<string> {
    const { email, sub } = verify(
      refresh_token,
      refreshTokenConfig.secret
    ) as RefreshTokenPayloadDTO

    const user_id = sub

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken({
        user_id,
        refresh_token
      })

    if (!userToken) throw new AppError('Refresh token does not exists!')

    const user_token_id = userToken.id as string

    await this.usersTokensRepository.deleteById(user_token_id)

    const newRefreshToken = sign({ email }, refreshTokenConfig.secret, {
      subject: user_id,
      expiresIn: refreshTokenConfig.expiresIn
    })

    const expires_date = addHoursInCurrentDate(
      refreshTokenConfig.expiresInHours
    )

    await this.usersTokensRepository.create({
      user_id,
      refresh_token: newRefreshToken,
      expires_date
    })

    return newRefreshToken
  }
}
