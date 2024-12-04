import jwt from "jsonwebtoken"
import { config } from "../../config/index.js"
import { logger } from "../../utils/logger.js"

export const authGuard = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(409).send("Token Not found")
        }
        const [type, token] = req.headers.authorization?.split(" ")
        if (type !== "Bearer" || !token) {
            return res.status(409).send("Not Valid Data")
        }
        jwt.verify(token, config.jwt.access.secret, (err, payload) => {
            if (err) {
                return res.status(403).send("Forbidden")
            }
            req.user = payload
            next()
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}
