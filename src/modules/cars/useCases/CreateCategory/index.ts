import { CategoriesRepository } from '../../repositories/CategoriesRepository'
import { CreateCategoryController } from './CreateCategoryController'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'

export const createCategoriesCompose = () => {
  const categoriesRepository = CategoriesRepository.getInstance()

  const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)

  const createCategoryController = new CreateCategoryController(
    createCategoryUseCase
  )
  return createCategoryController
}
