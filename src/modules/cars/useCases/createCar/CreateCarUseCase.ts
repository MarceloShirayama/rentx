import { AppError } from '../../../../shared/infra/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ICarsRepository } from '../../repositories/ICarsRepository'

type RequestCreateCar = {
  name: string
  description: string
  daily_rate: number
  license_plate: string
  fine_amount: number
  brand: string
  category_id: string
}

@injectable()
export class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute(data: RequestCreateCar): Promise<void> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      data.license_plate
    )

    if (carAlreadyExists)
      throw new AppError(
        `Car license plate ${data.license_plate} already exists`,
        409
      )

    this.carsRepository.create({ ...data })
  }
}
