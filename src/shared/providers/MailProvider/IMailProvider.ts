export type SendMailDTO = {
  to: string
  subject: string
  variables: any
  path: string
}

export interface IMailProvider {
  sendMail(data: SendMailDTO): Promise<void>
}
