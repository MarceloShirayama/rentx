import { Router } from 'express'
import { createSpecificationCompose } from '../modules/cars/useCases/CreateSpecification'
import { listSpecificationsCompose } from '../modules/cars/useCases/ListSpecifications'

const specificationsRoutes = Router()

specificationsRoutes.post('/', (req, res) => {
  return createSpecificationCompose().handle(req, res)
})

specificationsRoutes.get('/', (req, res) => {
  listSpecificationsCompose().handle(req, res)
})

export { specificationsRoutes }
