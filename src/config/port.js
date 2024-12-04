import { config } from "dotenv"
config()

export default {
    port: {
        port: process.env.PORT,
    },
}
