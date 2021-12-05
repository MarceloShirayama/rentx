import * as dotenv from 'dotenv'

dotenv.config()

export const jwtConfig = {
  secret: process.env.SECRET_KEY as string,
  expiresIn: '1d'
}

export const refreshTokenConfig = {
  secret: process.env.SECRET_REFRESH_TOKEN as string,
  expiresIn: '30d',
  expiresInHours: 720
}
