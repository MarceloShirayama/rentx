import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import { jwtConfig } from '../../../../config/auth'
import { AppError } from '../../../../shared/infra/errors/AppError'
import { IUsersRepository } from '../../repositories/IUsersRepository'

type RequestUserDTO = {
  email: string
  password: string
}

type ResponseUserDTO = {
  user: {
    name: string
    email: string
  }
  token: string
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: RequestUserDTO): Promise<ResponseUserDTO> {
    const userExists = await this.usersRepository.findByEmail(email)

    if (!userExists) throw new AppError('Email or password incorrect', 401)

    const passwordMatch = await compare(password, userExists.password)

    if (!passwordMatch) throw new AppError('Email or password incorrect', 401)

    const secret = String(jwtConfig.secret)
    const expiresIn = jwtConfig.expiresIn

    const token = sign({}, secret, {
      subject: userExists.id,
      expiresIn
    })

    const user = {
      name: userExists.name,
      email: userExists.email
    }

    return { user, token }
  }
}
