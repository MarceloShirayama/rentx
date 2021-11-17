import { AppError } from '../../../../errors/AppError'
import { CreateUserDTO } from '../../dtos/CreateUserDTO'
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory'
import { CreateUserUseCase } from '../CreateUser/CreateUserUseCase'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

let usersRepositoryInMemory: UsersRepositoryInMemory
let authenticateUserUseCase: AuthenticateUserUseCase
let createUserUseCase: CreateUserUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    )

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it('Should be able to authenticate an user', async () => {
    const userFake: CreateUserDTO = {
      name: 'any_name',
      password: 'any_password',
      email: 'any_email@mail.com',
      driver_license: 'any_driver_license'
    }

    const passwordFake = userFake.password

    await createUserUseCase.execute(userFake)

    const token = await authenticateUserUseCase.execute({
      email: userFake.email,
      password: passwordFake
    })

    expect(token).toHaveProperty('user')
    expect(token).toHaveProperty('token')
  })

  it('Should not be able to authenticate an nonexistent user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'any_email',
        password: 'any_password'
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to authenticate an user with incorrect password', async () => {
    expect(async () => {
      const userFake: CreateUserDTO = {
        name: 'any_name',
        password: 'any_password',
        email: 'any_email@mail.com',
        driver_license: 'any_driver_license'
      }

      const passwordInvalid = 'password_invalid'

      await createUserUseCase.execute(userFake)

      await authenticateUserUseCase.execute({
        email: userFake.email,
        password: passwordInvalid
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to authenticate an user with incorrect email', async () => {
    expect(async () => {
      const userFake: CreateUserDTO = {
        name: 'any_name',
        password: 'any_password',
        email: 'any_email@mail.com',
        driver_license: 'any_driver_license'
      }

      const passwordFake = userFake.password

      const emailInvalid = 'email_invalid'

      await createUserUseCase.execute(userFake)

      await authenticateUserUseCase.execute({
        email: emailInvalid,
        password: passwordFake
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
