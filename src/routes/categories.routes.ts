import { Router } from 'express'
import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository'
import { createCategoriesCompose } from '../modules/cars/useCases/CreateCategory'
// import { createCategoryController } from '../modules/cars/useCases/CreateCategory'

const categoriesRoutes = Router()

categoriesRoutes.post('/', (req, res) => {
  return createCategoriesCompose().handle(req, res)
})

categoriesRoutes.get('/', (req, res) => {
  const categoriesRepository = CategoriesRepository.getInstance()
  const categories = categoriesRepository.list()

  return res.status(200).send(categories)
})

export { categoriesRoutes }
