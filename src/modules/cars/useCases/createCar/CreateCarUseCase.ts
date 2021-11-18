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
    this.carsRepository.create({ ...data })
  }
}
