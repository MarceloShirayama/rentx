import * as dotenv from 'dotenv'

dotenv.config()

export const redisConfig = {
  host: process.env.REDIS_HOST as string,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD
}
