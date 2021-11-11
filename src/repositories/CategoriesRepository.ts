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
    const categoryAlreadyExists = this.findByName(name)

    if (categoryAlreadyExists)
      throw new Error(`${name} category already exists`)

    const category = new Category()

    Object.assign(category, { name, description })

    this.categories.push(category)
  }

  list(): Category[] {
    return this.categories
  }

  findByName(name: string) {
    const category = this.categories.find((category) => category.name === name)

    return category
  }
}
