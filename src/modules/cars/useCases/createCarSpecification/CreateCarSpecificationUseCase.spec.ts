import { AppError } from '../../../../shared/infra/errors/AppError'
import { ICarsRepository } from '../../repositories/ICarsRepository'
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory'
import { SpecificationsInMemory } from '../../repositories/in-memory/SpecificationsInMemory'
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository'
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase'

let carsRepository: ICarsRepository
let specificationsRepository: ISpecificationsRepository
let createCarSpecification: CreateCarSpecificationUseCase

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory()
    specificationsRepository = new SpecificationsInMemory()
    createCarSpecification = new CreateCarSpecificationUseCase(
      carsRepository,
      specificationsRepository
    )
  })

  it('Should be able to add a new specification to a car', async () => {
    const fakeCar = {
      name: 'any_name_car',
      description: 'any_description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'any_brand',
      category_id: 'any_id'
    }

    const fakeSpecification = {
      name: 'test',
      description: 'description test'
    }

    await carsRepository.create(fakeCar)

    const car = await carsRepository.findByLicensePlate(fakeCar.license_plate)

    await specificationsRepository.create(fakeSpecification)

    const specification = await specificationsRepository.findByName('test')

    await createCarSpecification.execute({
      car_id: car?.id,
      specification_id: [String(specification?.id)]
    })
    expect(car).toHaveProperty('specifications')
    expect(car?.specifications).toHaveLength(1)
    expect(car?.specifications[car?.specifications.length - 1].name).toBe(
      'test'
    )
    expect(
      car?.specifications[car?.specifications.length - 1].description
    ).toBe('description test')
  })

  it('Should not be able to add a new specification to a non-existent car', async () => {
    expect(async () => {
      const car_id = '1234'
      const specification_id = ['5321']

      await createCarSpecification.execute({ car_id, specification_id })
    }).rejects.toBeInstanceOf(AppError)
  })
})
