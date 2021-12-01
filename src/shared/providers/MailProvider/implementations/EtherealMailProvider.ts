import { injectable } from 'tsyringe'
import nodemailer, { Transporter } from 'nodemailer'
import { IMailProvider, SendMailDTO } from '../IMailProvider'

@injectable()
export class EtherealMailProvider implements IMailProvider {
  private client!: Transporter

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass
          }
        })

        this.client = transporter
      })
      .catch(console.log)
  }

  async sendMail({ to, subject, body }: SendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      to,
      from: 'Rentx <noreplay@rentx.com.br>',
      subject,
      text: body,
      html: body
    })

    console.log('Message sent: %s', message)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}