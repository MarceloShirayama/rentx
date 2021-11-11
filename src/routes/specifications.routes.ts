import { Router } from 'express'
import { SpecificationsRepository } from '../modules/cars/repositories/SpecificationsRepository'
import { CreateSpecificationUseCase } from '../modules/cars/useCases/CreateSpecification/CreateSpecificationUseCase'

const specificationsRoutes = Router()

const specificationsRepository = new SpecificationsRepository()

specificationsRoutes.post('/', (req, res) => {
  const { name, description } = req.body

  try {
    const createSpecificationUseCaseCreateSpecificationUseCase =
      new CreateSpecificationUseCase(specificationsRepository)

    createSpecificationUseCaseCreateSpecificationUseCase.execute({
      name,
      description
    })

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
