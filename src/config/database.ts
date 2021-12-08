import * as dotenv from 'dotenv'

dotenv.config()

const type = process.env.TYPEORM_CONNECTION
const host = process.env.TYPEORM_HOST
const port = process.env.TYPEORM_PORT
const username = process.env.TYPEORM_USERNAME
const password = process.env.TYPEORM_PASSWORD
const databaseTest = 'rentx_test'

export const databaseConfig = {
  type,
  host,
  port,
  username,
  password,
  databaseTest,
  entities: ['./src/modules/**/entities/*.ts'],
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations'
  }
}
