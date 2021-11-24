import { app } from './app'

const port = process.env.SERVER_PORT
const project = process.env.PROJECT_NAME

app.listen(port, () => {
  return console.log(`${project} run in: http://localhost:${port}`)
})
