import { instanceToInstance } from 'class-transformer'
import { ProfileUserOutputDTO } from '../dtos/ProfileUserDTO'

export class UserMap {
  static toDTO({
    id,
    name,
    email,
    avatar,
    driver_license,
    avatar_url
  }: ProfileUserOutputDTO) {
    const user = instanceToInstance({
      id,
      name,
      email,
      avatar,
      driver_license,
      avatar_url
    })
    return user
  }
}
