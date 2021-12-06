import { inject, injectable } from 'tsyringe'
import { ProfileUserOutputDTO } from '../../dtos/ProfileUserDTO'
import { UserMap } from '../../mapper/UserMap'
import { IUsersRepository } from '../../repositories/IUsersRepository'

@injectable()
export class ProfileUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(userId: string): Promise<ProfileUserOutputDTO> {
    const user = await this.usersRepository.findById(userId)

    const id = user?.id as string
    const name = user?.name as string
    const email = user?.email as string
    const avatar = user?.avatar as string
    const avatar_url = (): string | null | undefined => user?.avatar_url()
    const driver_license = user?.driver_license as string

    return UserMap.toDTO({
      id,
      name,
      email,
      avatar,
      avatar_url,
      driver_license
    })
  }
}
