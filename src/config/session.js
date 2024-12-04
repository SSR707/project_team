import { config } from "dotenv"
config()

export default {
    session: {
        secret: process.env.SESSION_SECRET_KEY,
    },
}
