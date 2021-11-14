import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateUserDTO } from '../../dtos/CreateUserDTO'
import { CreateUserUseCase } from './CreateUserUseCase'

type RequestUserDTO = CreateUserDTO

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const data: RequestUserDTO = req.body

    try {
      const createUserUseCase = container.resolve(CreateUserUseCase)
      await createUserUseCase.execute({ ...data })

      return res.status(201).send()
    } catch (error) {
      const message = (error as Error).message

      return res.status(409).send({ error: message })
    }
  }
}
