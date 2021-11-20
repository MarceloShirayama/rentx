import { inject, injectable } from 'tsyringe'
import { Car } from '../../infra/typeorm/entities/Car'
import {
  filterCarDTO,
  ICarsRepository
} from '../../repositories/ICarsRepository'

@injectable()
export class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({ name, brand, category_id }: filterCarDTO): Promise<Car[]> {
    const cars = await this.carsRepository.listAvailable({
      name,
      brand,
      category_id
    })

    return cars
  }
}
