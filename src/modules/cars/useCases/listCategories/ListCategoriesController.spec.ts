import { v4 as uuidV4 } from 'uuid'
import request from 'supertest'
import { Connection } from 'typeorm'
import { app } from '../../../../shared/infra/http/app'
import { connectionDatabase } from '../../../../shared/infra/typeorm'

let connection: Connection

describe('List Categories Controller', () => {
  jest.setTimeout(10000)
  beforeAll(async () => {
    connection = await connectionDatabase()
    await connection.runMigrations()
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 5000)) // https://stackoverflow.com/questions/50818367/how-to-fix-err-jest-has-detected-the-following-3-open-handles-potentially-keepin
  })

  it('Should be able to list all categories', async () => {
    await connection.query(
      `INSERT INTO categories(id, name, description, created_at)
      VALUES($1, $2, $3, $4)
      `,
      [`${uuidV4()}`, 'any category name', 'any description category', 'now()']
    )

    await connection.query(
      `INSERT INTO categories(id, name, description, created_at)
      VALUES($1, $2, $3, $4)
      `,
      [
        `${uuidV4()}`,
        'other category name',
        'other description category',
        'now()'
      ]
    )

    const response = await request(app).get('/categories')

    expect(response.body.length).toBe(2)
  })
})
