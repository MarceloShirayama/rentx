import { inject, injectable } from 'tsyringe'
import { Specification } from '../../entities/Specification'
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository'

@injectable()
export class ListSpecificationsUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  execute(): Specification[] {
    const specifications = this.specificationsRepository.list()

    return specifications
  }
}