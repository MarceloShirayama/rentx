import { hash } from 'bcrypt'
import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../errors/AppError'
import { CreateUserDTO } from '../../dtos/CreateUserDTO'
import { IUsersRepository } from '../../repositories/IUsersRepository'

type RequestUserDTO = CreateUserDTO

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: RequestUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email)

    if (userAlreadyExists)
      throw new AppError(`User ${data.email} already exists`, 409)

    const passwordHash = await hash(data.password, 8)

    data.password = passwordHash

    this.usersRepository.create({ ...data })
  }
}
