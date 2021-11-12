import { inject, injectable } from 'tsyringe'
import { Category } from '../../entities/Category'
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  execute(): Category[] {
    const categories = this.categoriesRepository.list()

    return categories
  }
}
