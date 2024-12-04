export const cheackMiddleware = (req,res,next) => {
    if (req.params.id == req.user.id || req.user.role == "admin") {
        next()
    } else {
        res.status(403).send("Forbidden")
    }
}