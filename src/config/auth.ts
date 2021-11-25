import * as dotenv from 'dotenv'

dotenv.config()

export const jwtConfig = {
  secret: process.env.SECRET_KEY,
  expiresIn: '1000d'
}
