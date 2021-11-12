import { SpecificationsRepository } from '../../repositories/Implementations/SpecificationsRepository'
import { CreateSpecificationController } from './CreateSpecificationController'
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase'

export const createSpecificationCompose = () => {
  const specificationRepository = SpecificationsRepository.getInstance()

  const createSpecificationUseCase = new CreateSpecificationUseCase(
    specificationRepository
  )

  const createSpecificationController = new CreateSpecificationController(
    createSpecificationUseCase
  )

  return createSpecificationController
}
