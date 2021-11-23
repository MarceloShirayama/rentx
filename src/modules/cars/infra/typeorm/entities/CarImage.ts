import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

@Entity('cars_image')
export class CarImage {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column()
  car_id!: string

  @Column()
  image_name!: string

  @Column()
  created_at?: Date

  constructor() {
    if (!this.id) this.id = uuidV4()
    this.created_at = new Date()
  }
}
