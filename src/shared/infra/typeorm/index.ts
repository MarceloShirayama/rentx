import { Connection, createConnection, getConnectionOptions } from 'typeorm'

export async function connectionDatabase(): Promise<Connection> {
  let options

  if (process.env.NODE_ENV === 'test') {
    options = {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'rentx',
      password: 'rentx',
      database: 'rentx_test',
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
