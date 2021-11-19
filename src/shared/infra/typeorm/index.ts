import { Connection, createConnection, getConnectionOptions } from 'typeorm'

export async function connectionDatabase(): Promise<Connection> {
  const defaultOptions = await getConnectionOptions()

  return createConnection(
    Object.assign(defaultOptions, { host: process.env.TYPEORM_HOST })
  )
}
