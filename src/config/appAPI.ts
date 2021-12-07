const appName = process.env.PROJECT_NAME
const appPort = process.env.SERVER_PORT
const appHost = process.env.SERVER_HOST
const appUrl = `http://${appHost}:${appPort}`

export const appConfig = {
  appName,
  appPort,
  appHost,
  appUrl
}
