import { hash } from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'
import { connectionDatabase } from '../index'

// const create = async () => {
//   const connection = connectionDatabase()

//   const id = uuidV4()
//   const name = 'User Admin Seed'
//   const password = await hash('admin', 8)
//   const email = 'admin@mail.com'
//   const driver_license = '00000000000000'
//   const isAdmin = true
//   const created_at = 'now()'
//   const avatar = ''

//   const query = `
//   INSERT INTO users(id, name, password, email, "isAdmin", driver_license, created_at, avatar)
//   VALUES($1, $2, $3, $4, $5, $6, $7, $8)
//   `

//   await (
//     await connection
//   ).query(query, [
//     id,
//     name,
//     password,
//     email,
//     isAdmin,
//     driver_license,
//     created_at,
//     avatar
//   ])

//   await (
//     await connection
//   ).close
// }

// create().then(() => console.log('User admin created!'))
;(async function create() {
  const connection = await connectionDatabase()

  const id = uuidV4()
  const name = 'User Admin Seed'
  const password = await hash('admin', 8)
  const email = 'admin@mail.com'
  const driver_license = '00000000000000'
  const isAdmin = true
  const created_at = 'now()'
  const avatar = ''

  const querySql = `
  INSERT INTO users(id, name, password, email, "isAdmin", driver_license, created_at, avatar)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8)
  `

  await connection.query(querySql, [
    id,
    name,
    password,
    email,
    isAdmin,
    driver_license,
    created_at,
    avatar
  ])

  // eslint-disable-next-line no-unused-expressions
  connection.close

  console.log('User admin created!')
})()
