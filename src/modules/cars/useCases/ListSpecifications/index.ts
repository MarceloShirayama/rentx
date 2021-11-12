import { SpecificationsRepository } from '../../repositories/Implementations/SpecificationsRepository'
import { ListSpecificationsController } from './ListSpecificationsController'
import { ListSpecificationsUseCase } from './ListSpecificationsUseCase'

export const listSpecificationsCompose = () => {
  const specificationsRepository = SpecificationsRepository.getInstance()

  const listSpecificationsUseCase = new ListSpecificationsUseCase(
    specificationsRepository
  )

  const listSpecificationsController = new ListSpecificationsController(
    listSpecificationsUseCase
  )

  return listSpecificationsController
}
