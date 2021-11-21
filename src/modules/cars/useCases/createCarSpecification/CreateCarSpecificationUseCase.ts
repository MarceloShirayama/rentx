import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../shared/infra/errors/AppError'
import { ICarsRepository } from '../../repositories/ICarsRepository'
import {
  CreateCarSpecificationDTO,
  ISpecificationsRepository
} from '../../repositories/ISpecificationsRepository'

@injectable()
export class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({
    car_id,
    specification_id
  }: CreateCarSpecificationDTO): Promise<void> {
    const carExists = await this.carsRepository.findById({ car_id })

    if (!carExists) throw new AppError('Car does not exists', 404)

    if (specification_id) {
      const specifications = await this.specificationsRepository.findByIds(
        specification_id
      )

      carExists.specifications = specifications

      await this.carsRepository.create(carExists)
    }
  }
}
