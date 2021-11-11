import { Router } from 'express'
import { CategoriesRepository } from '../repositories/CategoriesRepository'
import { CreateCategoryService } from '../services/CreateCategoryService'

const categoriesRoutes = Router()

const categoriesRepository = new CategoriesRepository()
const createCategoryService = new CreateCategoryService(categoriesRepository)

categoriesRoutes.post('/', (req, res) => {
  const { name, description } = req.body

  try {
    createCategoryService.execute({ name, description })

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
