import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

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

  constructor() {
    if (!this.id) this.id = uuidV4()
    this.isAdmin = false
    this.created_at = new Date()
    this.avatar = ''
  }
}
