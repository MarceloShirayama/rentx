export type RefreshTokenOutputDTO = {
  token: string
  refresh_token: string
}

export type RefreshTokenInputDTO = {
  email: string
  sub: string
}
