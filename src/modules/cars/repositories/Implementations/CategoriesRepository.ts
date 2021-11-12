import { Category } from '../../entities/Category'
import { ICategoriesRepository, ICategoryDTO } from '../ICategoriesRepository'

export class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[]

  constructor() {
    this.categories = []
  }

  create({ name, description }: ICategoryDTO): void {
    const category = new Category()

    Object.assign(category, { name, description })

    this.categories.push(category)
  }

  list(): Category[] {
    const categories = this.categories
    return categories
  }

  findByName(name: string): Category | undefined {
    const category = this.categories.find((category) => category.name === name)

    return category
  }
}
