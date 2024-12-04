import { config } from "dotenv"
config()

export default {
    eamil: {
        user: process.env.USER_MAIL,
        pass: process.env.USER_MAIL_PASSWORD,
    },
}
