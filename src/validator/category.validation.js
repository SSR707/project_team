import Joi from "joi"

export const categoryValidation = (data) => {
    const validation = Joi.object({
        name: Joi.string().max(255).required().messages({
            "string.empty": `"name" bo'sh bo'lishi mumkin emas`,
            "string.max": `"name" uzunligi 255 ta belgidan oshmasligi kerak`,
            "any.required": `"name" maydoni talab qilinadi`,
        }),
        description: Joi.string().max(255).required().messages({
            "string.empty": `"description" bo'sh bo'lishi mumkin emas`,
            "string.max": `"description" uzunligi 255 ta belgidan oshmasligi kerak`,
            "any.required": `"description" maydoni talab qilinadi`,
        }),
        tag: Joi.string().max(255).required().messages({
            "string.empty": `"tag" bo'sh bo'lishi mumkin emas`,
            "string.max": `"tag" uzunligi 255 ta belgidan oshmasligi kerak`,
            "any.required": `"tag" maydoni talab qilinadi`,
        }),
    })
    return validation.validate(data)
}
