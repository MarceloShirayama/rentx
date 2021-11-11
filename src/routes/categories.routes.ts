import { Router } from 'express'
import { Category } from '../entities/Category'

const categoriesRoutes = Router()

const categories: Category[] = []

categoriesRoutes.post('/', (req, res) => {
  const { name, description } = req.body

  const category = new Category()

  Object.assign(category, { name, description })

  categories.push(category)

  return res.status(201).send(category)
})

export { categoriesRoutes }
