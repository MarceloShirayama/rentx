import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory'
import { CreateCarUseCase } from './CreateCarUseCase'

let carsRepository: CarsRepositoryInMemory
let createCarUseCase: CreateCarUseCase

describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepository)
  })

  it('Should be able to create a new car', async () => {
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
    console.log('carSave: ', carSave)

    expect(carSave).toHaveProperty('id')
    expect(carSave?.name).toBe(fakeCar.name)
  })
})
