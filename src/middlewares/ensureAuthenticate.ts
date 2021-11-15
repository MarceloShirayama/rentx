import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { UsersRepository } from '../modules/accounts/repositories/Implementations/UsersRepository'

type HeadersPayloadDTO = {
  sub: string
}

export async function ensureAuthenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization

  if (!authHeader) throw new Error('Token missing')

  const [, token] = authHeader.split(' ')

  try {
    const { sub: user_id } = verify(
      token,
      String(process.env.SECRET_KEY)
    ) as HeadersPayloadDTO

    const usersRepository = new UsersRepository()

    const user = await usersRepository.findById(user_id)

    if (!user) throw new Error(`User id ${user_id} not found`)

    next()
  } catch {
    throw new Error('Invalid token')
  }
}
