import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'
import { v4 as uuidV4 } from 'uuid'
import { resolve } from 'path'
import { AppError } from '../../../../shared/infra/errors/AppError'
import { IMailProvider } from '../../../../shared/container/providers/MailProvider/IMailProvider'
import { addHoursInCurrentDate } from '../../../../utils/date'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository'
import { mailConfig } from '../../../../config/mail'

@injectable()
export class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgotPassword.hbs'
    )

    if (!user) throw new AppError('User does not exists!')

    const token = uuidV4()

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id as string,
      expires_date: addHoursInCurrentDate(3)
    })

    const variables = {
      name: user.name,
      link: `${mailConfig.forgotMailUrl}${token}`
    }

    await this.mailProvider.sendMail({
      to: email,
      subject: `Recuperação de senha do usuário ${email}`,
      variables,
      path: templatePath
    })
  }
}
