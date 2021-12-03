import { IUsersRepository } from '../../repositories/IUsersRepository'
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository'
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase'
import { IMailProvider } from '../../../../shared/providers/MailProvider/IMailProvider'
import { MailProviderInMemory } from '../../../../shared/providers/MailProvider/inMemory/MailProviderInMemory'
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory'
import { UsersTokensRepositoryInMemory } from '../../repositories/in-memory/UsersTokensRepositoryInMemory'
import { CreateUserDTO } from '../../dtos/CreateUserDTO'
import { AppError } from '../../../../shared/infra/errors/AppError'

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let usersRepository: IUsersRepository
let usersTokensRepository: IUsersTokensRepository
let mailProvider: IMailProvider

const userFake: CreateUserDTO = {
  name: 'any_name',
  password: 'any_password',
  email: 'any_email@mail.com',
  driver_license: 'any_driver_license'
}

const createUser = async (data: CreateUserDTO) => {
  await usersRepository.create(data)
}

describe('SendForgotPasswordMail', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory()
    usersTokensRepository = new UsersTokensRepositoryInMemory()
    mailProvider = new MailProviderInMemory()
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepository,
      usersTokensRepository,
      mailProvider
    )
  })

  it('Should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail')

    await createUser(userFake)

    await sendForgotPasswordMailUseCase.execute(userFake.email)

    expect(sendMail).toHaveBeenCalled()
  })

  it('Should not be able to send a forgot password mail if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute(userFake.email)
    ).rejects.toEqual(new AppError('User does not exists!'))
  })
})
