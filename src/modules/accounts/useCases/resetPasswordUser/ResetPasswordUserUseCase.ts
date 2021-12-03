import { hash } from 'bcrypt'
import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../shared/infra/errors/AppError'
import { compareIfDateIsBefore } from '../../../../utils/date'
import { ResetPasswordInputDTO } from '../../dtos/ResetPasswordDTO'
import { UserTokens } from '../../infra/typeorm/entities/UserTokens'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository'

@injectable()
export class ResetPasswordUserUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: ResetPasswordInputDTO): Promise<void> {
    const userToken = (await this.usersTokensRepository.findByRefreshToken(
      data.token
    )) as UserTokens

    if (!userToken) throw new AppError('Token invalid')

    const expiredToken = compareIfDateIsBefore(
      userToken.expires_date,
      new Date()
    )

    if (expiredToken) throw new AppError('Token expired!')

    const user = await this.usersRepository.findById(userToken.user_id)

    if (user) {
      user.password = await hash(data.password, 8)

      await this.usersRepository.create(user)

      const user_token_id = userToken.id as string
      await this.usersTokensRepository.deleteById(user_token_id)
    }
  }
}
