import { ISpecificationsRepository } from '../repositories/ISpecificationsRepository'

interface IRequest {
  name: string
  description: string
}

export class CreateSpecificationService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private specificationRepository: ISpecificationsRepository) {}

  execute({ name, description }: IRequest): void {
    const specificationAlreadyExists =
      this.specificationRepository.findByName(name)

    if (specificationAlreadyExists)
      throw new Error(`${name} specification already exists`)

    this.specificationRepository.create({ name, description })
  }
}
