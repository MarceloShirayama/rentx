import { AppError } from '../../../../shared/infra/errors/AppError'
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'
import { CategoriesRepositoryInMemory } from '../../repositories/in-memory/CategoriesRepositoryInMemory'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'

let categoriesRepositoryInMemory: ICategoriesRepository
let createCategoryUseCase: CreateCategoryUseCase

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()

    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    )
  })

  it('Should be able to create a new category', async () => {
    const categoryFake = {
      name: 'Category Test',
      description: 'Category Test description'
    }

    await createCategoryUseCase.execute({
      name: categoryFake.name,
      description: categoryFake.description
    })

    const categoryInMemory = await categoriesRepositoryInMemory.findByName(
      categoryFake.name
    )

    expect(categoryInMemory).toHaveProperty('id')
    expect(categoryInMemory?.name).toEqual(categoryFake.name)
    expect(categoryInMemory?.description).toEqual(categoryFake.description)
  })

  it('Should not be able to create a new category with an already registered name', async () => {
    expect(async () => {
      const categoryFake = {
        name: 'Category Test',
        description: 'Category Test description'
      }

      await createCategoryUseCase.execute({
        name: categoryFake.name,
        description: categoryFake.description
      })

      await createCategoryUseCase.execute({
        name: categoryFake.name,
        description: categoryFake.description
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
