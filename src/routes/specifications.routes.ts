import { Router } from 'express'
import { CreateSpecificationController } from '../modules/cars/useCases/CreateSpecification/CreateSpecificationController'
import { ListSpecificationsController } from '../modules/cars/useCases/ListSpecifications/ListSpecificationsController'

const specificationsRoutes = Router()

const listSpecificationsController = new ListSpecificationsController()
const createSpecificationController = new CreateSpecificationController()

specificationsRoutes.post('/', createSpecificationController.handle)

specificationsRoutes.get('/', listSpecificationsController.handle)

export { specificationsRoutes }
