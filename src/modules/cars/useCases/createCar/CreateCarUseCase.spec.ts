import { AppError } from '../../../../shared/infra/errors/AppError'
import { ICarsRepository } from '../../repositories/ICarsRepository'
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory'
import { CreateCarUseCase } from './CreateCarUseCase'

let carsRepository: ICarsRepository
let createCarUseCase: CreateCarUseCase

describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepository)
  })

  it('Should be able to create a new car as available by default', async () => {
    const fakeCar = {
      name: 'any_name_car',
      description: 'any_description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'any_brand',
      category_id: 'any_id'
    }

    await createCarUseCase.execute(fakeCar)

    const carSave = await carsRepository.findByLicensePlate(
      fakeCar.license_plate
    )

    expect(carSave).toHaveProperty('id')
    expect(carSave?.name).toBe(fakeCar.name)
    expect(carSave?.available).toBeTruthy()
  })

  it('Should not be able to create a new car if already exists an car with equal license plate', async () => {
    const fakeCar = {
      name: 'any_name_car',
      description: 'any_description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'any_brand',
      category_id: 'any_id'
    }

    await createCarUseCase.execute(fakeCar)

    await expect(createCarUseCase.execute(fakeCar)).rejects.toEqual(
      new AppError(
        `Car license plate ${fakeCar.license_plate} already exists`,
        409
      )
    )
  })
})
