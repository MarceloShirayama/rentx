import { inject, injectable } from 'tsyringe'
import { IStorageProvider } from '../../../../shared/container/providers/StorageProvider/IStorageProvider'
import {
  ICarsImagesRepository,
  UploadImageRequestDTO
} from '../../repositories/ICarsImagesRepository'

@injectable()
export class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({ car_id, images_name }: UploadImageRequestDTO): Promise<void> {
    images_name.map(async (image_name) => {
      await this.carsImagesRepository.create({ car_id, image_name })

      await this.storageProvider.saveFile(image_name, 'cars')
    })
  }
}
