import { container } from 'tsyringe'
import { mailConfig } from '../../../../config/mail'
import { IMailProvider } from './IMailProvider'
import { EtherealMailProvider } from './implementations/EtherealMailProvider'
import { GMailMailProvider } from './implementations/GMailMailProvider'

if (mailConfig.mailService === 'ethereal') {
  container.registerInstance<IMailProvider>(
    'MailProvider',
    container.resolve(EtherealMailProvider)
  )
} else if (mailConfig.mailService === 'gmail') {
  container.registerInstance<IMailProvider>(
    'MailProvider',
    container.resolve(GMailMailProvider)
  )
}
