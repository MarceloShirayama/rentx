import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory'
import { CreateCarUseCase } from '../createCar/CreateCarUseCase'
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase'

describe('List Available Cars', () => {
  let carsRepository: CarsRepositoryInMemory
  let listAvailableCars: ListAvailableCarsUseCase
  let createCarUseCase: CreateCarUseCase

  beforeEach(async () => {
    carsRepository = new CarsRepositoryInMemory()
    listAvailableCars = new ListAvailableCarsUseCase(carsRepository)
    createCarUseCase = new CreateCarUseCase(carsRepository)

    const fakeCar1 = {
      name: 'fakeCar 1',
      description: 'description fakeCar1',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'any_brand',
      category_id: 'any_category_id'
    }

    const fakeCar2 = {
      name: 'fakeCar 2',
      description: 'description fakeCar 2',
      daily_rate: 100,
      license_plate: 'ABC-2345',
      fine_amount: 60,
      brand: 'any_brand',
      category_id: 'any_category_id'
    }

    const fakeCar3 = {
      name: 'fakeCar 3',
      description: 'description fakeCar 3',
      daily_rate: 100,
      license_plate: 'ABC-3456',
      fine_amount: 60,
      brand: 'other_any_brand',
      category_id: 'other_any_category_id'
    }

    const fakeCar4 = {
      name: 'fakeCar 4',
      description: 'description fakeCar 4',
      daily_rate: 100,
      license_plate: 'ABC-4567',
      fine_amount: 60,
      brand: 'any_brand',
      category_id: 'any_category_id',
      available: false
    }

    await createCarUseCase.execute(fakeCar1)
    await createCarUseCase.execute(fakeCar2)
    await createCarUseCase.execute(fakeCar3)
    await createCarUseCase.execute(fakeCar4)
  })

  it('Should be able list all available cars', async () => {
    const cars = await listAvailableCars.execute({})

    expect(cars).toHaveLength(3)
  })

  it('Should be able list all available by category_id', async () => {
    const cars = await listAvailableCars.execute({
      category_id: 'other_any_category_id'
    })

    expect(cars).toHaveLength(1)
  })

  it('Should be able list all available by brand', async () => {
    const cars = await listAvailableCars.execute({
      brand: 'any_brand'
    })

    expect(cars).toHaveLength(2)
  })

  it('Should be able list all available by name', async () => {
    const cars = await listAvailableCars.execute({
      name: 'fakeCar 1'
    })

    expect(cars).toHaveLength(1)
  })
})
