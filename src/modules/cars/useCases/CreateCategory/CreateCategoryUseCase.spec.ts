import { CategoriesRepositoryInMemory } from '../../repositories/in-memory/CategoriesRepositoryInMemory'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory
let createCategoryUseCase: CreateCategoryUseCase

describe('Create Category', () => {
  beforeAll(() => {
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
})
