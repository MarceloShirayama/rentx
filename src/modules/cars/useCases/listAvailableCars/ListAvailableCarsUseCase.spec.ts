import { ICarsRepository } from '../../repositories/ICarsRepository'
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory'
import { CreateCarUseCase } from '../createCar/CreateCarUseCase'
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase'

describe('List Available Cars', () => {
  let carsRepository: ICarsRepository
  let listAvailableCars: ListAvailableCarsUseCase
  let createCarUseCase: CreateCarUseCase

  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory()
    listAvailableCars = new ListAvailableCarsUseCase(carsRepository)
    createCarUseCase = new CreateCarUseCase(carsRepository)
  })

  it('Should be able list all available cars', async () => {
    const fakeCar1 = {
      name: 'any_name_car 1',
      description: 'any_description 1',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'any_brand',
      category_id: 'any_id'
    }

    const fakeCar2 = {
      name: 'any_name_car 2',
      description: 'any_description 2',
      daily_rate: 100,
      license_plate: 'ABC-2345',
      fine_amount: 60,
      brand: 'any_brand',
      category_id: 'any_id'
    }

    const fakeCar3 = {
      name: 'any_name_car 3',
      description: 'any_description 3',
      daily_rate: 100,
      license_plate: 'ABC-3456',
      fine_amount: 60,
      brand: 'any_brand',
      category_id: 'any_id',
      available: false
    }

    await createCarUseCase.execute(fakeCar1)
    await createCarUseCase.execute(fakeCar2)
    await createCarUseCase.execute(fakeCar3)

    const cars = await listAvailableCars.execute()

    expect(cars).toHaveLength(2)
  })
})
