import * as dotenv from 'dotenv'

dotenv.config()

export const mailConfig = {
  forgotMailUrl: process.env.FORGOT_MAIL_URL as string
}
