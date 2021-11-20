import { inject, injectable } from 'tsyringe'
import { Car } from '../../infra/typeorm/entities/Car'
import { ICarsRepository } from '../../repositories/ICarsRepository'

@injectable()
export class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute(): Promise<Car[]> {
    const cars = await this.carsRepository.listAvailable()

    return cars
  }
}
