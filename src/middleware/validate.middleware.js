export const validateRequest = (validationFunction) => (req, res, next) => {
    const { error, value } = validationFunction(req.body)

    if (error) {
        return res.status(400).json({
            success: false,
            message: "validatsiyasi xatosi",
            errors: error.details.map((err) => err.message),
        })
    }
    
    req.validatedData = value
    next()
}