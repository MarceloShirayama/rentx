import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

type RequestUserDTO = {
  email: string
  password: string
}

export class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password }: RequestUserDTO = req.body

    try {
      const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)

      const token = await authenticateUserUseCase.execute({
        email,
        password
      })

      return res.status(201).send(token)
    } catch (error) {
      const message = (error as Error).message

      return res.status(401).send({ error: message })
    }
  }
}
