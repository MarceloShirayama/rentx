import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

@Entity('specifications')
export class Specification {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column()
  name!: string

  @Column()
  description!: string

  @CreateDateColumn()
  created_at?: Date

  constructor() {
    if (!this.id) this.id = uuidV4()
    this.created_at = new Date()
  }
}
