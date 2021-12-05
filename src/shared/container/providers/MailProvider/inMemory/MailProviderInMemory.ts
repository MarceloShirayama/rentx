import { IMailProvider, SendMailDTO } from '../IMailProvider'

export class MailProviderInMemory implements IMailProvider {
  private message: any[] = []
  async sendMail(data: SendMailDTO): Promise<void> {
    this.message.push(data)
  }
}
