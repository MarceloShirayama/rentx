import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory'
import { CreateCarUseCase } from '../createCar/CreateCarUseCase'
import { ListCarsUseCase } from './ListCarsUseCase'

let carsRepository: CarsRepositoryInMemory
let listCarsUseCase: ListCarsUseCase
let createCarUseCase: CreateCarUseCase

describe('List Cars', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory()
    listCarsUseCase = new ListCarsUseCase(carsRepository)
    createCarUseCase = new CreateCarUseCase(carsRepository)
  })

  it('Should be able list all cars', async () => {
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

    await createCarUseCase.execute(fakeCar1)
    await createCarUseCase.execute(fakeCar2)

    const cars = await listCarsUseCase.execute()
    expect(cars).toHaveLength(2)
  })
})
