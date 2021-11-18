import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column()
  name!: string

  @Column()
  description!: string

  @Column()
  daily_rate!: number

  @Column()
  available?: boolean

  @Column()
  license_plate!: string

  @Column()
  fine_amount!: number

  @Column()
  brand!: string

  @Column()
  category_id!: string

  @CreateDateColumn()
  created_at?: Date

  constructor() {
    if (!this.id) this.id = uuidV4()
    this.created_at = new Date()
    this.available = true
  }
}
