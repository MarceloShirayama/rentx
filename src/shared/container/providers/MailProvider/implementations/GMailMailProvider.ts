import { injectable } from 'tsyringe'
import nodemailer, { Transporter } from 'nodemailer'
import handlebars from 'handlebars'
import fs from 'fs'
import { IMailProvider, SendMailDTO } from '../IMailProvider'
import { mailConfig } from '../../../../../config/mail'

@injectable()
export class GMailMailProvider implements IMailProvider {
  private client!: Transporter

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: mailConfig.gmailHost,
          port: mailConfig.gmailPort,
          secure: false,
          auth: {
            user: mailConfig.gmailUser,
            pass: mailConfig.gmailAppPass
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
      from: `Marcelo <${mailConfig.gmailUser}>`,
      subject,
      html: templateHTML
    })

    console.log('Message sent: %s', message)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}
