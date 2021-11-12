import { Router } from 'express'
import { CreateCategoryController } from '../modules/cars/useCases/CreateCategory/CreateCategoryController'
import { ListCategoriesController } from '../modules/cars/useCases/ListCategories/ListCategoriesController'

const categoriesRoutes = Router()

const createCategoryController = new CreateCategoryController()
const listCategoriesController = new ListCategoriesController()

categoriesRoutes.post('/', createCategoryController.handle)

categoriesRoutes.get('/', listCategoriesController.handle)

export { categoriesRoutes }
