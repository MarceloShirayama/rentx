import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../repositories/IUsersRepository'

export type RequestUserAvatar = {
  user_id: string
  avatarFile?: string
}

@injectable()
export class UpdateUseAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id, avatarFile }: RequestUserAvatar): Promise<void> {
    const user = await this.usersRepository.findById(user_id)

    user!.avatar = avatarFile

    await this.usersRepository.create(user!)
  }
}
