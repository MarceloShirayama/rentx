import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
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

    if (!userExists) throw new Error('Email or password incorrect')

    const passwordMatch = await compare(password, userExists.password)

    if (!passwordMatch) throw new Error('Email or password incorrect')

    const token = sign({}, String(process.env.SECRET_KEY), {
      subject: userExists.id,
      expiresIn: '1d'
    })

    const user = {
      name: userExists.name,
      email: userExists.email
    }

    return { user, token }
  }
}
