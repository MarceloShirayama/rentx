import { container } from 'tsyringe'
import { uploadConfig } from '../../../../config/upload'
import { LocalStorageProvider } from './implementations/LocalStorageProvider'
import { S3StorageProvider } from './implementations/S3StorageProvider'
import { IStorageProvider } from './IStorageProvider'

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
