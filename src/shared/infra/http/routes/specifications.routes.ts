import { Router } from 'express'
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate'
import { CreateSpecificationController } from '../../../../modules/cars/useCases/CreateSpecification/CreateSpecificationController'
import { ListSpecificationsController } from '../../../../modules/cars/useCases/listSpecifications/ListSpecificationsController'
import { ensureAdmin } from '../middlewares/ensureAdmin'

const specificationsRoutes = Router()

const listSpecificationsController = new ListSpecificationsController()
const createSpecificationController = new CreateSpecificationController()

specificationsRoutes.post(
  '/',
  ensureAuthenticate,
  ensureAdmin,
  createSpecificationController.handle
)

specificationsRoutes.get('/', listSpecificationsController.handle)

export { specificationsRoutes }
