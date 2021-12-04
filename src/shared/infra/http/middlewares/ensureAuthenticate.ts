import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { jwtConfig } from '../../../../config/auth'
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

  if (!authHeader) throw new AppError('Token missing', 401)

  const [, token] = authHeader.split(' ')

  try {
    const { sub: user_id } = verify(
      token,
      jwtConfig.secret
    ) as HeadersPayloadDTO

    req.user = { id: user_id }

    next()
  } catch {
    throw new AppError('Invalid token', 401)
  }
}
