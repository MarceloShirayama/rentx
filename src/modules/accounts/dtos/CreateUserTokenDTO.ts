export type CreateUserTokenDTO = {
  user_id: string
  expires_date: Date
  refresh_token: string
}

export type RequestUserTokensDTo = {
  user_id: string
  refresh_token: string
}

export type RefreshTokenPayloadDTO = {
  email: string
  sub: string
}
