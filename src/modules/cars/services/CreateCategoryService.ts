import { ICategoriesRepository } from '../repositories/ICategoriesRepository'

interface IRequest {
  name: string
  description: string
}

export class CreateCategoryService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: IRequest): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name)

    if (categoryAlreadyExists)
      throw new Error(`${name} category already exists`)

    this.categoriesRepository.create({ name, description })
  }
}