import { container } from 'tsyringe'
import { uploadConfig } from '../../../config/upload'
import { IMailProvider } from './MailProvider/IMailProvider'
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider'
import { LocalStorageProvider } from './StorageProvider/implementations/LocalStorageProvider'
import { S3StorageProvider } from './StorageProvider/implementations/S3StorageProvider'
import { IStorageProvider } from './StorageProvider/IStorageProvider'

container.registerInstance<IMailProvider>(
  'EtherealMailProvider',
  new EtherealMailProvider()
)

console.log(uploadConfig.diskStorage)

// FIXME: Esta abordagem não está corretamente implementada, pois sem restartar a aplicação, o container não reconhece a nova implementação, e restartando a aplicação, o s3 não deleta o arquivo.
// TODO: Uma forma mais apropriada seria setar local nos testes e s3 em produção.
if (uploadConfig.diskStorage === 's3') {
  container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    S3StorageProvider
  )
} else if (uploadConfig.diskStorage === 'local') {
  container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    LocalStorageProvider
  )
}
