import { Router } from 'express'
import multer from 'multer'
import { CreateCategoryController } from '../../../../modules/cars/useCases/CreateCategory/CreateCategoryController'
import { ImportCategoryController } from '../../../../modules/cars/useCases/ImportCategory/ImportCategoryController'
import { ListCategoriesController } from '../../../../modules/cars/useCases/listCategories/ListCategoriesController'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate'

const categoriesRoutes = Router()

const upload = multer({
  dest: './tmp'
})

const createCategoryController = new CreateCategoryController()
const listCategoriesController = new ListCategoriesController()
const importCategoryController = new ImportCategoryController()

categoriesRoutes.post(
  '/',
  ensureAuthenticate,
  ensureAdmin,
  createCategoryController.handle
)

categoriesRoutes.get('/', listCategoriesController.handle)

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle
)

export { categoriesRoutes }
