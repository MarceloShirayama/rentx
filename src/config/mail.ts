import * as dotenv from 'dotenv'

dotenv.config()

export const mailConfig = {
  forgotMailUrl: process.env.FORGOT_MAIL_URL as string,
  gmailHost: process.env.GMAIL_HOST as string,
  gmailPort: Number(process.env.GMAIL_PORT),
  gmailUser: process.env.GMAIL_USER as string,
  gmailAppPass: process.env.GMAIL_APP_PASS as string,
  mailService: process.env.MAIL_SERVICE as string
}
