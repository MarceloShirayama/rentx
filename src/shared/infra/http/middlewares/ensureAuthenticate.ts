import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { refreshTokenConfig } from '../../../../config/auth'
import { UsersTokensRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository'
import { AppError } from '../../errors/AppError'

type HeadersPayloadDTO = {
  sub: string
}

export async function ensureAuthenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization
  const usersTokensRepository = new UsersTokensRepository()

  if (!authHeader) throw new AppError('Token missing', 401)

  const [, refresh_token] = authHeader.split(' ')

  try {
    const { sub: user_id } = verify(
      refresh_token,
      refreshTokenConfig.secret
    ) as HeadersPayloadDTO

    const user = await usersTokensRepository.findByUserIdAndRefreshToken({
      user_id,
      refresh_token
    })

    if (!user) throw new AppError(`User id ${user_id} not found`, 401)

    req.user = { id: user_id }

    next()
  } catch {
    throw new AppError('Invalid token', 401)
  }
}
