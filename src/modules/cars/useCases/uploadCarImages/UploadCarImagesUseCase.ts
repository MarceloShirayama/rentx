import { inject, injectable } from 'tsyringe'
import {
  ICarsImagesRepository,
  UploadImageRequestDTO
} from '../../repositories/ICarsImagesRepository'

@injectable()
export class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository
  ) {}

  async execute({ car_id, images_name }: UploadImageRequestDTO): Promise<void> {
    images_name.map(async (image_name) => {
      await this.carsImagesRepository.create({ car_id, image_name })
    })
  }
}
