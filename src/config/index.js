import client from "./client.js"
import email from "./email.js"
import jwt from "./jwt.js"
import port from "./port.js"
import session from "./session.js"

export const config = {
    ...email,
    ...jwt,
    ...port,
    ...client,
    ...session
}
