import { inject, injectable } from 'tsyringe'
import { v4 as uuidV4 } from 'uuid'
import { AppError } from '../../../../shared/infra/errors/AppError'
import { IMailProvider } from '../../../../shared/providers/MailProvider/IMailProvider'
import { addHoursInCurrentDate } from '../../../../utils/date'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository'

@injectable()
export class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('EtherealMailProvider')
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) throw new AppError('User does not exists!')

    const token = uuidV4()

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id as string,
      expires_date: addHoursInCurrentDate(3)
    })

    await this.mailProvider.sendMail({
      to: email,
      subject: `Recuperação de senha do usuário ${email}`,
      body: `O link para o reset é ${token}`
    })
  }
}
