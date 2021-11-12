import { Router } from 'express'
import { createCategoriesCompose } from '../modules/cars/useCases/CreateCategory'
import { listCategoriesCompose } from '../modules/cars/useCases/ListCategories'

const categoriesRoutes = Router()

categoriesRoutes.post('/', (req, res) => {
  return createCategoriesCompose().handle(req, res)
})

categoriesRoutes.get('/', (req, res) => {
  return listCategoriesCompose().handle(req, res)
})

export { categoriesRoutes }
