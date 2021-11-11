import { Router } from 'express'
import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository'
import { CreateCategoryUseCase } from '../modules/cars/useCases/CreateCategory/CreateCategoryUseCase'

const categoriesRoutes = Router()

const categoriesRepository = new CategoriesRepository()

categoriesRoutes.post('/', (req, res) => {
  const { name, description } = req.body

  try {
    const createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepository
    )

    createCategoryUseCase.execute({ name, description })

    return res.status(201).send()
  } catch (error) {
    const message = (error as Error).message

    return res.status(409).send({ error: message })
  }
})

categoriesRoutes.get('/', (req, res) => {
  const categories = categoriesRepository.list()

  return res.status(200).send(categories)
})

export { categoriesRoutes }
