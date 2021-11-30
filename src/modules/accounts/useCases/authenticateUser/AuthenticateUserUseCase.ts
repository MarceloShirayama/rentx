import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import { jwtConfig, refreshToken } from '../../../../config/auth'
import { AppError } from '../../../../shared/infra/errors/AppError'
import { addHoursInCurrentDate } from '../../../../utils/date'
import { RequestUserDTO, ResponseUserDTO } from '../../dtos/CreateUserDTO'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository'

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository
  ) {}

  async execute({ email, password }: RequestUserDTO): Promise<ResponseUserDTO> {
    const userExists = await this.usersRepository.findByEmail(email)

    if (!userExists) throw new AppError('Email or password incorrect', 401)

    const passwordMatch = await compare(password, userExists.password)

    if (!passwordMatch) throw new AppError('Email or password incorrect', 401)

    const token = sign({}, jwtConfig.secret, {
      subject: userExists.id,
      expiresIn: jwtConfig.expiresIn
    })

    const refresh_token = sign({ email }, refreshToken.secret, {
      subject: userExists.id,
      expiresIn: refreshToken.expiresIn
    })

    const expiresRefreshToken = addHoursInCurrentDate(
      refreshToken.expiresRefreshToken
    )

    await this.usersTokensRepository.create({
      user_id: userExists.id as string,
      refresh_token,
      expires_date: expiresRefreshToken
    })

    const user = {
      name: userExists.name,
      email: userExists.email
    }

    return { user, token, refresh_token }
  }
}
