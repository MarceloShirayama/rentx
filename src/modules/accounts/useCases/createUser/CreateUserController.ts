import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateUserDTO } from '../../dtos/CreateUserDTO'
import { CreateUserUseCase } from './CreateUserUseCase'

type RequestUserDTO = CreateUserDTO

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const data: RequestUserDTO = req.body

    const createUserUseCase = container.resolve(CreateUserUseCase)
    await createUserUseCase.execute({ ...data })

    return res.status(201).send()
  }
}
