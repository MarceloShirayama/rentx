import { Router } from 'express'
import { SpecificationsRepository } from '../modules/cars/repositories/SpecificationsRepository'
import { CreateSpecificationService } from '../modules/cars/services/CreateSpecificationService'

const specificationsRoutes = Router()

const specificationsRepository = new SpecificationsRepository()

specificationsRoutes.post('/', (req, res) => {
  const { name, description } = req.body

  try {
    const createSpecificationService = new CreateSpecificationService(
      specificationsRepository
    )

    createSpecificationService.execute({ name, description })

    return res.status(201).send()
  } catch (error) {
    const message = (error as Error).message

    return res.status(409).send({ error: message })
  }
})

specificationsRoutes.get('/', (req, res) => {
  const specifications = specificationsRepository.list()

  return res.status(200).send(specifications)
})

export { specificationsRoutes }
