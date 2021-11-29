import { AppError } from '../../../../shared/infra/errors/AppError'
import { addHoursInCurrentDate } from '../../../../utils/date'
import { CreateUserDTO } from '../../../accounts/dtos/CreateUserDTO'
import { User } from '../../../accounts/infra/typeorm/entities/Users'
import { UsersRepositoryInMemory } from '../../../accounts/repositories/in-memory/UsersRepositoryInMemory'
import { IUsersRepository } from '../../../accounts/repositories/IUsersRepository'
import { CreateCarDTO } from '../../../cars/dtos/CreateCarDTO'
import { Car } from '../../../cars/infra/typeorm/entities/Car'
import { ICarsRepository } from '../../../cars/repositories/ICarsRepository'
import { CarsRepositoryInMemory } from '../../../cars/repositories/in-memory/CarsRepositoryInMemory'
import { RequestRentalDTO } from '../../dtos/rentalDTOs'
import { RentalsRepositoryInMemory } from '../../repositories/in-memory/RentalsRepositoryInMemory'
import { IRentalsRepository } from '../../repositories/IRentalsRepository'
import { CreateRentalUseCase } from './CreateRentalUseCase'

let rentalsRepository: IRentalsRepository
let createRentalUseCase: CreateRentalUseCase
let carsRepository: ICarsRepository
let car_1: Car | undefined
let car_1_id: string
let user_1: User | undefined
let user_1_id: string
let user_2: User | undefined
let user_2_id: string
let car_2: Car | undefined
let car_2_id: string
let user_3: User | undefined
let user_3_id: string
let car_3: Car | undefined
let car_3_id: string
let usersRepository: IUsersRepository

const userFake1: CreateUserDTO = {
  name: 'user_name_1',
  password: '1234',
  email: 'user_1_email@mail.com',
  driver_license: 'AAA1111'
}

const userFake2: CreateUserDTO = {
  name: 'user_name_2',
  password: '1234',
  email: 'user_2_email@mail.com',
  driver_license: 'AAA2222'
}

const userFake3: CreateUserDTO = {
  name: 'user_name_3',
  password: '1234',
  email: 'user_3_email@mail.com',
  driver_license: 'AAA3333'
}

const carFake1: CreateCarDTO = {
  name: 'any_name_car',
  description: 'any_description',
  daily_rate: 100,
  license_plate: 'ABC-1234',
  fine_amount: 60,
  brand: 'any_brand',
  category_id: 'any_category_id'
}

const carFake2: CreateCarDTO = {
  name: 'any_name_car_2',
  description: 'any_description_car_2',
  daily_rate: 200,
  license_plate: 'ABC-2345',
  fine_amount: 60,
  brand: 'any_brand_2',
  category_id: 'any_category_id_2'
}

const carFake3: CreateCarDTO = {
  name: 'any_name_car_3',
  description: 'any_description_car_3',
  daily_rate: 200,
  license_plate: 'ABC-3456',
  fine_amount: 60,
  brand: 'any_brand_3',
  category_id: 'any_category_id_3'
}

describe('Create Rental', () => {
  beforeAll(async () => {
    rentalsRepository = new RentalsRepositoryInMemory()
    carsRepository = new CarsRepositoryInMemory()
    usersRepository = new UsersRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepository,
      carsRepository
    )
    await carsRepository.create(carFake1)
    car_1 = await carsRepository.findByLicensePlate(carFake1.license_plate)
    car_1_id = car_1?.id as string

    await usersRepository.create(userFake1)
    user_1 = await usersRepository.findByEmail(userFake1.email)
    user_1_id = user_1?.id as string

    await usersRepository.create(userFake2)
    user_2 = await usersRepository.findByEmail(userFake2.email)
    user_2_id = user_2?.id as string

    await carsRepository.create(carFake2)
    car_2 = await carsRepository.findByLicensePlate(carFake2.license_plate)
    car_2_id = car_2?.id as string

    await usersRepository.create(userFake3)
    user_3 = await usersRepository.findByEmail(userFake3.email)
    user_3_id = user_3?.id as string

    await carsRepository.create(carFake3)
    car_3 = await carsRepository.findByLicensePlate(carFake3.license_plate)
    car_3_id = car_3?.id as string
  })

  it('Should be able to create a new rental', async () => {
    const fakeRentalData: RequestRentalDTO = {
      user_id: user_1_id,
      car_id: car_1_id,
      expect_return_date: addHoursInCurrentDate(24)
    }

    await createRentalUseCase.execute(fakeRentalData)

    const rentalInMemory = await rentalsRepository.findOpenRentalByUser(
      fakeRentalData.user_id
    )

    expect(rentalInMemory).toHaveProperty('id')
    expect(rentalInMemory).toHaveProperty('expect_return_date')
    expect(rentalInMemory).toHaveProperty('expect_return_date')
    expect(rentalInMemory).toHaveProperty('user_id', user_1_id)
    expect(rentalInMemory).toHaveProperty('car_id', car_1_id)
    expect(car_1?.available).toBeFalsy()
  })

  it('Should not be able to create a new rental if car not exists', async () => {
    const fakeRentalData: RequestRentalDTO = {
      user_id: user_2_id,
      car_id: 'invalid_car_id',
      expect_return_date: addHoursInCurrentDate(24)
    }

    await expect(createRentalUseCase.execute(fakeRentalData)).rejects.toEqual(
      new AppError('Car not found', 409)
    )
  })

  it('Should not be able to create a new rental if car is unavailable', async () => {
    const fakeRentalData: RequestRentalDTO = {
      user_id: user_2_id,
      car_id: car_1_id,
      expect_return_date: addHoursInCurrentDate(24)
    }

    expect(car_1?.available).toBeFalsy()
    await expect(createRentalUseCase.execute(fakeRentalData)).rejects.toEqual(
      new AppError('Car is unavailable', 401)
    )
  })

  it('Should not be able to create a new rental if already exists open rental to user', async () => {
    const fakeRentalData: RequestRentalDTO = {
      user_id: user_1_id,
      car_id: car_2_id,
      expect_return_date: addHoursInCurrentDate(24)
    }

    await expect(createRentalUseCase.execute(fakeRentalData)).rejects.toEqual(
      new AppError('Already exists open rental to user', 401)
    )

    expect(car_2?.available).toBeTruthy()
  })

  it('Should not be able to create a new rental if expected return date is less than 24 hours', async () => {
    const fakeRentalData: RequestRentalDTO = {
      user_id: user_3_id,
      car_id: car_3_id,
      expect_return_date: addHoursInCurrentDate(23)
    }
    await expect(createRentalUseCase.execute(fakeRentalData)).rejects.toEqual(
      new AppError('The car rental must have a minimum duration of 24 hours.')
    )

    expect(car_3?.available).toBeTruthy()
  })
})
