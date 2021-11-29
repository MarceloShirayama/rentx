import { AppError } from '../../../../shared/infra/errors/AppError'
import { CreateUserDTO } from '../../dtos/CreateUserDTO'
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { CreateUserUseCase } from '../CreateUser/CreateUserUseCase'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

let usersRepositoryInMemory: IUsersRepository
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
    await expect(
      authenticateUserUseCase.execute({
        email: 'any_email',
        password: 'any_password'
      })
    ).rejects.toEqual(new AppError('Email or password incorrect', 401))
  })

  it('Should not be able to authenticate an user with incorrect password', async () => {
    const userFake: CreateUserDTO = {
      name: 'any_name',
      password: 'any_password',
      email: 'any_email@mail.com',
      driver_license: 'any_driver_license'
    }

    const passwordInvalid = 'password_invalid'

    await createUserUseCase.execute(userFake)

    await expect(
      authenticateUserUseCase.execute({
        email: userFake.email,
        password: passwordInvalid
      })
    ).rejects.toEqual(new AppError('Email or password incorrect', 401))
  })

  it('Should not be able to authenticate an user with incorrect email', async () => {
    const userFake: CreateUserDTO = {
      name: 'any_name',
      password: 'any_password',
      email: 'any_email@mail.com',
      driver_license: 'any_driver_license'
    }

    const passwordFake = userFake.password

    const emailInvalid = 'email_invalid'

    await createUserUseCase.execute(userFake)

    await expect(
      authenticateUserUseCase.execute({
        email: emailInvalid,
        password: passwordFake
      })
    ).rejects.toEqual(new AppError('Email or password incorrect', 401))
  })
})
