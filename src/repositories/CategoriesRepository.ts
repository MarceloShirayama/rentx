import { Category } from '../entities/Category'

interface ICategoryDTO {
  name: string
  description: string
}

export class CategoriesRepository {
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
    return this.categories
  }
}
