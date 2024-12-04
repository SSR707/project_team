import { logger } from "../../utils/index.js"

export const roleGuard = (...roles) => {
    return async (req, res, next) => {
        try {
            const { role } = req.user
            if (!roles.includes(role)) {
                return res.send("Acces deny")
            }
            next()
        } catch (error) {
            logger.error(error)
            next(error)
        }
    }
}
