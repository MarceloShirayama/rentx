import { inject, injectable } from 'tsyringe'
import { Car } from '../../infra/typeorm/entities/Car'
import { ICarsRepository } from '../../repositories/ICarsRepository'

@injectable()
export class ListCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  // TODO: list all cars by name, category_id and brand
  // TODO: merge listCarUse and listAvailableCarsUse
  async execute(): Promise<Car[]> {
    const cars = await this.carsRepository.list()

    return cars
  }
}
