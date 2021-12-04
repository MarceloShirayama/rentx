import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ResetPasswordInputDTO } from '../../dtos/ResetPasswordDTO'
import { ResetPasswordUserUseCase } from './ResetPasswordUserUseCase'

export class ResetPasswordUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const input: ResetPasswordInputDTO = {
      token: String(req.query.token),
      password: req.body.password
    }

    const resetPasswordUserUseCase = container.resolve(ResetPasswordUserUseCase)

    await resetPasswordUserUseCase.execute(input)

    return res.send()
  }
}
