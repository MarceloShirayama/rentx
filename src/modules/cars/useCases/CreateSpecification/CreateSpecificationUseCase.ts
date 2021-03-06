import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../shared/infra/errors/AppError'
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository'

interface IRequest {
  name: string
  description: string
}

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationRepository.findByName(name)

    if (specificationAlreadyExists)
      throw new AppError(`${name} specification already exists`, 409)

    this.specificationRepository.create({ name, description })
  }
}
