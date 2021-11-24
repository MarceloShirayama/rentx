import { AppError } from '../../../../shared/infra/errors/AppError'
import { RequestRentalDTO } from '../../dtos/rentalDTOs'
import { RentalsRepositoryInMemory } from '../../repositories/in-memory/RentalsRepositoryInMemory'
import { IRentalsRepository } from '../../repositories/IRentalsRepository'
import { CreateRentalUseCase } from './CreateRentalUseCase'

let rentalsRepository: IRentalsRepository
let createRentalUseCase: CreateRentalUseCase

const addHoursInCurrentDate = (hours: number) =>
  new Date(new Date().setHours(new Date().getHours() + hours))

describe('Create Rental', () => {
  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(rentalsRepository)
  })

  it('Should be able to create a new rental', async () => {
    const fakeRentalData: RequestRentalDTO = {
      user_id: 'any_user_id',
      car_id: 'any_car_id',
      expect_return_date: addHoursInCurrentDate(24)
    }

    await createRentalUseCase.execute(fakeRentalData)

    const rentalInMemory = await rentalsRepository.findOpenRentalByUser(
      fakeRentalData.user_id
    )

    expect(rentalInMemory).toHaveProperty('id')
    expect(rentalInMemory).toHaveProperty('expect_return_date')
    expect(rentalInMemory).toHaveProperty('expect_return_date')
    expect(rentalInMemory).toHaveProperty('user_id', 'any_user_id')
    expect(rentalInMemory).toHaveProperty('car_id', 'any_car_id')
  })

  it('Should not be able to create a new rental if car is unavailable', async () => {
    const fakeRentalData: RequestRentalDTO = {
      user_id: 'any_user_id',
      car_id: 'any_car_id',
      expect_return_date: addHoursInCurrentDate(24)
    }

    const fakeRentalData2: RequestRentalDTO = {
      user_id: 'other_user_id',
      car_id: 'any_car_id',
      expect_return_date: addHoursInCurrentDate(24)
    }

    expect(async () => {
      await createRentalUseCase.execute(fakeRentalData)
      await createRentalUseCase.execute(fakeRentalData2)
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to create a new rental if already exists open rental to user', async () => {
    const fakeRentalData: RequestRentalDTO = {
      user_id: 'any_user_id',
      car_id: 'any_car_id',
      expect_return_date: addHoursInCurrentDate(24)
    }

    const fakeRentalData2: RequestRentalDTO = {
      user_id: 'any_user_id',
      car_id: 'other_car_id',
      expect_return_date: addHoursInCurrentDate(24)
    }

    expect(async () => {
      await createRentalUseCase.execute(fakeRentalData)
      await createRentalUseCase.execute(fakeRentalData2)
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to create a new rental if expected return date is less than 24 hours', async () => {
    const fakeRentalData: RequestRentalDTO = {
      user_id: 'any_user_id',
      car_id: 'any_car_id',
      expect_return_date: addHoursInCurrentDate(23)
    }

    expect(async () => {
      await createRentalUseCase.execute(fakeRentalData)
    }).rejects.toBeInstanceOf(AppError)
  })
})
