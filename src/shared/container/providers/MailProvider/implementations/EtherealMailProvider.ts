import { injectable } from 'tsyringe'
import nodemailer, { Transporter } from 'nodemailer'
import handlebars from 'handlebars'
import fs from 'fs'
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

  async sendMail({ to, subject, variables, path }: SendMailDTO): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8')

    const templateParse = handlebars.compile(templateFileContent)

    const templateHTML = templateParse(variables)

    const message = await this.client.sendMail({
      to,
      from: 'Rentx <noreplay@rentx.com.br>',
      subject,
      html: templateHTML
    })

    console.log('Message sent: %s', message)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}