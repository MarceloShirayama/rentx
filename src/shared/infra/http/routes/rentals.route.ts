import { Router } from 'express'
import { CreateRentalController } from '../../../../modules/rentals/usesCases/createRental/CreateRentalController'
import { DevolutionRentalController } from '../../../../modules/rentals/usesCases/devolutionRental/DevolutionRentalController'
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate'

const rentalsRoutes = Router()

const createRentalController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()

rentalsRoutes.post('/', ensureAuthenticate, createRentalController.handle)

rentalsRoutes.post(
  '/devolution/:id',
  ensureAuthenticate,
  devolutionRentalController.handle
)

export { rentalsRoutes }
