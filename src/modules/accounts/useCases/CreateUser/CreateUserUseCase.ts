import { inject, injectable } from 'tsyringe'
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
    const userAlreadyExists = await this.usersRepository.findByUsername(
      data.username
    )

    if (userAlreadyExists)
      throw new Error(`User ${data.username} already exists`)

    this.usersRepository.create({ ...data })
  }
}
