import Joi from "joi"

export const feedbackValidation = (data) => {
    const validation = Joi.object({
        event_id: Joi.string().max(255).required().messages({
            "string.empty": `"event_id" bo'sh bo'lishi mumkin emas`,
            "string.max": `"event_id" uzunligi 255 ta belgidan oshmasligi kerak`,
            "any.required": `"event_id" maydoni talab qilinadi`,
        }),
        type: Joi.string().max(255).required().messages({
            "string.empty": `"type" bo'sh bo'lishi mumkin emas`,
            "string.max": `"type" uzunligi 255 ta belgidan oshmasligi kerak`,
            "any.required": `"type" maydoni talab qilinadi`,
        }),
        message: Joi.string().max(255).required().messages({
            "string.empty": `"message" bo'sh bo'lishi mumkin emas`,
            "string.max": `"message" uzunligi 255 ta belgidan oshmasligi kerak`,
            "any.required": `"message" maydoni talab qilinadi`,
        }),
        status: Joi.string().max(255).required().messages({
            "string.empty": `"status" bo'sh bo'lishi mumkin emas`,
            "string.max": `"status" uzunligi 255 ta belgidan oshmasligi kerak`,
            "any.required": `"status" maydoni talab qilinadi`,
        }),
    })
    return validation.validate(data)
}
