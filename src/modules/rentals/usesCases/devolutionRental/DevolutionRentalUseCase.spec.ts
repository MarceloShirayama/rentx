import { addHoursInCurrentDate } from '../../../../utils/date'
import { CreateUserDTO } from '../../../accounts/dtos/CreateUserDTO'
import { UsersRepositoryInMemory } from '../../../accounts/repositories/in-memory/UsersRepositoryInMemory'
import { IUsersRepository } from '../../../accounts/repositories/IUsersRepository'
import { CreateCarDTO } from '../../../cars/dtos/CreateCarDTO'
import { ICarsRepository } from '../../../cars/repositories/ICarsRepository'
import { CarsRepositoryInMemory } from '../../../cars/repositories/in-memory/CarsRepositoryInMemory'
import { RentalsRepositoryInMemory } from '../../repositories/in-memory/RentalsRepositoryInMemory'
import { IRentalsRepository } from '../../repositories/IRentalsRepository'
import { DevolutionRentalUseCase } from './DevolutionRentalUseCase'

let rentalsRepository: IRentalsRepository
let carsRepository: ICarsRepository
let devolutionRentalUseCase: DevolutionRentalUseCase
let usersRepository: IUsersRepository

const createRental = async (
  car_id: string,
  user_id: string,
  expect_return_date: Date
) => {
  await rentalsRepository.create({
    car_id,
    user_id,
    expect_return_date
  })
  const rental = await rentalsRepository.findOpenRentalByUser(user_id)
  await carsRepository.updateAvailable({
    car_id,
    available: false
  })

  return rental
}

const createUser = async (user: CreateUserDTO) => {
  await usersRepository.create(user)
  const response = await usersRepository.findByEmail(user.email)
  return response
}

const createCar = async (car: CreateCarDTO) => {
  await carsRepository.create(car)
  const response = await carsRepository.findByLicensePlate(car.license_plate)
  return response
}

describe('DevolutionRentalUseCase', () => {
  beforeEach(async () => {
    rentalsRepository = new RentalsRepositoryInMemory()
    carsRepository = new CarsRepositoryInMemory()
    devolutionRentalUseCase = new DevolutionRentalUseCase(
      rentalsRepository,
      carsRepository
    )
    usersRepository = new UsersRepositoryInMemory()
  })

  it('Should be able to make a car devolution', async () => {
    const userFake1: CreateUserDTO = {
      name: 'user_name_1',
      password: '1234',
      email: 'user_1_email@mail.com',
      driver_license: 'AAA1111'
    }

    const carFake1: CreateCarDTO = {
      name: 'any_name_car',
      description: 'any_description',
      license_plate: 'ABC-1234',
      brand: 'any_brand',
      category_id: 'any_category_id',
      fine_amount: 60,
      daily_rate: 100
    }

    const car = await createCar(carFake1)
    const car_id = car?.id as string

    const user = await createUser(userFake1)
    const user_id = user?.id as string

    const rental = await createRental(
      car_id,
      user_id,
      addHoursInCurrentDate(72)
    )
    const rental_id = rental?.id as string

    const response = await devolutionRentalUseCase.execute(rental_id)

    expect(car?.available).toBeTruthy()
    expect(response).toHaveProperty('id')
    expect(response).toHaveProperty('car_id')
    expect(response).toHaveProperty('total')
  })
})
