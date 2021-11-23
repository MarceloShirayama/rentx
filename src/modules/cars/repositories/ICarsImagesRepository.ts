import { CarImage } from '../infra/typeorm/entities/CarImage'

export type UploadImageDTO = {
  car_id: string
  image_name: string
}

export type UploadImageRequestDTO = {
  car_id: string
  images_name: string[]
}

export interface ICarsImagesRepository {
  create({ car_id, image_name }: UploadImageDTO): Promise<CarImage>
}
