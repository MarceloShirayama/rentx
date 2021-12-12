import { NextFunction, Request, Response } from 'express'
import { RateLimiterRedis } from 'rate-limiter-flexible'
import redis from 'redis'
import { redisConfig } from '../../../../config/redis'
import { AppError } from '../../errors/AppError'

export async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const redisClient = redis.createClient({
      host: redisConfig.host,
      port: redisConfig.port
    })

    const limiter = new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: 'rateLimiter',
      points: 5,
      duration: 5
    })
    await limiter.consume(req.ip)

    return next()
  } catch (err) {
    throw new AppError('Too many requests', 429)
  }
}
