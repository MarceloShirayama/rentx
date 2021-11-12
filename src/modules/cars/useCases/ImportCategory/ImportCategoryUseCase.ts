import { injectable } from 'tsyringe'

@injectable()
export class ImportCategoryUseCase {
  execute(file: any) {
    console.log(file)
  }
}
