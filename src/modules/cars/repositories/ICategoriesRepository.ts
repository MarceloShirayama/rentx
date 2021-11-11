import { Category } from '../entities/Category'

export interface ICategoryDTO {
  name: string
  description: string
}

export interface ICategoriesRepository {
  create({ name, description }: ICategoryDTO): void
  list(): Category[]
  findByName(name: string): Category | undefined
}
