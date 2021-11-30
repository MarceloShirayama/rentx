import * as dotenv from 'dotenv'

dotenv.config()

export const jwtConfig = {
  secret: process.env.SECRET_KEY,
  expiresIn: '15m'
}

export const refreshToken = {
  secret: process.env.SECRET_REFRESH_TOKEN,
  expiresIn: '30d',
  expiresRefreshToken: 720
}
