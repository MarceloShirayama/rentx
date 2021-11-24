import { hash } from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'
import request from 'supertest'
import { Connection } from 'typeorm'
import { app } from '../../../../shared/infra/http/app'
import { connectionDatabase } from '../../../../shared/infra/typeorm'

let connection: Connection

const emailAdminSeed = 'admin_test@mail.com'
const passwordAdminSeed = 'admin_test'

const createUserAdminSeed = async () => {
  const id = uuidV4()
  const name = 'User Admin Seed'
  const password = await hash(`${passwordAdminSeed}`, 8)
  const email = `${emailAdminSeed}`
  const driver_license = '00000000000000'
  const isAdmin = true
  const created_at = 'now()'
  const avatar = ''

  const querySql = `
  INSERT INTO users(id, name, password, email, "isAdmin", driver_license, created_at, avatar)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8)
  `

  await connection.query(querySql, [
    id,
    name,
    password,
    email,
    isAdmin,
    driver_license,
    created_at,
    avatar
  ])
}

describe('Create Category Controller', () => {
  jest.setTimeout(30000)
  beforeAll(async () => {
    connection = await connectionDatabase()
    await connection.runMigrations()
    await createUserAdminSeed()
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 10000)) // https://stackoverflow.com/questions/50818367/how-to-fix-err-jest-has-detected-the-following-3-open-handles-potentially-keepin
  })

  it('Should be able to create a new category', async () => {
    const responseToken = await request(app)
      .post('/sessions')
      .send({ email: `${emailAdminSeed}`, password: `${passwordAdminSeed}` })

    const { token } = responseToken.body

    await request(app)
      .post('/categories')
      .send({
        name: 'any category name',
        description: 'any description category name'
      })
      .set({ authorization: `Bearer ${token}` })
      .expect(201)
  })

  it('Should not be able to create a new category with an already registered name', async () => {
    const responseToken = await request(app)
      .post('/sessions')
      .send({ email: `${emailAdminSeed}`, password: `${passwordAdminSeed}` })

    const { token } = responseToken.body

    await request(app)
      .post('/categories')
      .send({
        name: 'any category name',
        description: 'other description category name'
      })
      .set({ authorization: `Bearer ${token}` })
      .expect(409)
  })
})
