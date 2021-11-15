import { Router } from 'express'
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate'
import { CreateSpecificationController } from '../modules/cars/useCases/CreateSpecification/CreateSpecificationController'
import { ListSpecificationsController } from '../modules/cars/useCases/ListSpecifications/ListSpecificationsController'

const specificationsRoutes = Router()

const listSpecificationsController = new ListSpecificationsController()
const createSpecificationController = new CreateSpecificationController()

specificationsRoutes.post(
  '/',
  ensureAuthenticate,
  createSpecificationController.handle
)

specificationsRoutes.get('/', listSpecificationsController.handle)

export { specificationsRoutes }
