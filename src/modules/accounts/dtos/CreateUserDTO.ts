export type CreateUserDTO = {
  id?: string
  name: string
  password: string
  email: string
  driver_license: string
  avatar?: string
}

export type RequestUserDTO = {
  email: string
  password: string
}

export type ResponseUserDTO = {
  user: {
    name: string
    email: string
  }
  token: string
  refresh_token: string
}
