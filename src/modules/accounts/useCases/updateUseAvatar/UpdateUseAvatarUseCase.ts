import { inject, injectable } from 'tsyringe'
import { IStorageProvider } from '../../../../shared/container/providers/StorageProvider/IStorageProvider'
import { IUsersRepository } from '../../repositories/IUsersRepository'

export type RequestUserAvatar = {
  user_id: string
  avatarFile?: string
}

@injectable()
export class UpdateUseAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({ user_id, avatarFile }: RequestUserAvatar): Promise<void> {
    const user = await this.usersRepository.findById(user_id)

    if (user?.avatar)
      await this.storageProvider.deleteFile(user.avatar, 'avatar')

    if (avatarFile) await this.storageProvider.saveFile(avatarFile, 'avatar')

    user!.avatar = avatarFile

    await this.usersRepository.create(user!)
  }
}
