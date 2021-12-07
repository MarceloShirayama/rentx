import { appConfig } from '../../../config/appAPI'
import { mailConfig } from '../../../config/mail'
import { uploadConfig } from '../../../config/upload'
import { app } from './app'

const host = appConfig.appHost
const port = appConfig.appPort
const project = appConfig.appName

app.listen(port, () => {
  return console.log(`
  ${project} run in: http://${host}:${port}
  disk storage: ${uploadConfig.diskStorage}
  mail service: ${mailConfig.mailService}
  `)
})
