import { CategoriesRepository } from '../../repositories/CategoriesRepository'
import { ListCategoriesController } from './ListCategoriesController'
import { ListCategoriesUseCase } from './ListCategoriesUseCase'

export const listCategoriesCompose = () => {
  const categoriesRepository = CategoriesRepository.getInstance()

  const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository)

  const listCategoriesController = new ListCategoriesController(
    listCategoriesUseCase
  )

  return listCategoriesController
}
