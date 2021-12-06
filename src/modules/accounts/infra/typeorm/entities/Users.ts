import { Expose } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'
import { v4 as uuidV4 } from 'uuid'
import { appConfig } from '../../../../../config/app'
import { uploadConfig } from '../../../../../config/upload'
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column()
  name!: string

  @Column()
  password!: string

  @Column()
  email!: string

  @Column()
  driver_license!: string

  @Column()
  isAdmin?: boolean

  @Column()
  avatar?: string

  @CreateDateColumn()
  created_at?: Date

  @Expose({ name: 'avatar_url' })
  avatar_url(): string | null | undefined {
    switch (uploadConfig.diskStorage) {
      case 'local':
        return `${appConfig.appUrl}/avatar/${this.avatar}`
      case 's3':
        return `${uploadConfig.urlBucket}/avatar/${this.avatar}`
      default:
        return null
    }
  }

  constructor() {
    if (!this.id) this.id = uuidV4()
    this.isAdmin = false
    this.created_at = new Date()
    this.avatar = ''
  }
}
