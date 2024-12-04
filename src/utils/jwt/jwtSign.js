import jwt from "jsonwebtoken"
import { config } from "../../config/index.js"

export const accessTokenSing = async (payload) => {
    return jwt.sign(payload, config.jwt.access.secret, {
        expiresIn: config.jwt.access.expiresIn,
    })
}

export const refreshTokenSing = async (payload) => {
    return jwt.sign(payload, config.jwt.refresh.secret, {
        expiresIn: config.jwt.refresh.expiresIn,
    })
}
