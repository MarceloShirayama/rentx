import { Router } from 'express'
import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository'
import { CreateCategoryController } from '../modules/cars/useCases/CreateCategory/CreateCategoryController'
import { CreateCategoryUseCase } from '../modules/cars/useCases/CreateCategory/CreateCategoryUseCase'

const categoriesRoutes = Router()

const categoriesRepository = new CategoriesRepository()
const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)
const createCategoryController = new CreateCategoryController(
  createCategoryUseCase
)

categoriesRoutes.post('/', (req, res) => {
  createCategoryController.handle(req, res)
})

categoriesRoutes.get('/', (req, res) => {
  const categories = categoriesRepository.list()

  return res.status(200).send(categories)
})

export { categoriesRoutes }
