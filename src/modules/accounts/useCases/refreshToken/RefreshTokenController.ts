import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { RefreshTokenUseCase } from './RefreshTokenUseCase'

export class RefreshTokenController {
  async handle(req: Request, res: Response): Promise<Response> {
    const token =
      req.body.refresh_token ||
      req.headers['x-access-token'] ||
      req.query.refresh_token

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase)

    const refreshToken = await refreshTokenUseCase.execute(token)

    return res.json(refreshToken)
  }
}
