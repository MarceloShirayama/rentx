import { Category } from '../../entities/Category'
import { ICategoriesRepository, ICategoryDTO } from '../ICategoriesRepository'

export class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = []

  async create({ name, description }: ICategoryDTO): Promise<void> {
    const category = new Category()

    Object.assign(category, { name, description })

    this.categories.push(category)
  }

  async list(): Promise<Category[]> {
    const categories = this.categories

    return categories
  }

  async findByName(name: string): Promise<Category | undefined> {
    const category = this.categories.find((category) => category.name === name)

    return category
  }
}
