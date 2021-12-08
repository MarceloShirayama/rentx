import { Connection, createConnection, getConnectionOptions } from 'typeorm'
import { databaseConfig } from '../../../config/database'

export async function connectionDatabase(): Promise<Connection> {
  let options

  if (process.env.NODE_ENV === 'test') {
    options = {
      type: databaseConfig.type,
      host: databaseConfig.host,
      port: databaseConfig.port,
      username: databaseConfig.username,
      password: databaseConfig.password,
      database: databaseConfig.databaseTest,
      entities: ['./src/modules/**/entities/*.ts'],
      migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
      cli: {
        migrationsDir: './src/shared/infra/typeorm/migrations'
      }
    }
  } else {
    options = await getConnectionOptions()
  }

  return createConnection(Object.assign(options))
}
