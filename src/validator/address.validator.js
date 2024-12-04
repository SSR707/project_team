import Joi from "joi"

export const addressValidator = (address) => {
    const schema = Joi.object({
        title: Joi.string().max(255).required().messages({
            "string.empty": `"title" bo'sh bo'lishi mumkin emas`,
            "string.max": `"title" uzunligi 255 ta belgidan oshmasligi kerak`,
            "any.required": `"title" maydoni talab qilinadi`,
        }),
        address_line_1: Joi.string().max(255).required().messages({
            "string.empty": `"address_line_1" bo'sh bo'lishi mumkin emas`,
            "string.max": `"address_line_1" uzunligi 255 ta belgidan oshmasligi kerak`,
            "any.required": `"address_line_1" maydoni talab qilinadi`,
        }),
        address_line_2: Joi.string().max(255).allow(null, "").messages({
            "string.max": `"address_line_2" uzunligi 255 ta belgidan oshmasligi kerak`,
        }),
        country: Joi.string().max(100).required().messages({
            "string.empty": `"country" bo'sh bo'lishi mumkin emas`,
            "string.max": `"country" uzunligi 100 ta belgidan oshmasligi kerak`,
            "any.required": `"country" maydoni talab qilinadi`,
        }),
        city: Joi.string().max(100).required().messages({
            "string.empty": `"city" bo'sh bo'lishi mumkin emas`,
            "string.max": `"city" uzunligi 100 ta belgidan oshmasligi kerak`,
            "any.required": `"city" maydoni talab qilinadi`,
        }),
        postal_code: Joi.string().max(20).required().messages({
            "string.empty": `"postal_code" bo'sh bo'lishi mumkin emas`,
            "string.max": `"postal_code" uzunligi 20 ta belgidan oshmasligi kerak`,
            "any.required": `"postal_code" maydoni talab qilinadi`,
        }),
        phone_number: Joi.string()
            .pattern(/^[0-9\-\+\s]+$/)
            .required()
            .messages({
                "string.empty": `"phone_number" bo'sh bo'lishi mumkin emas`,
                "string.pattern.base": `"phone_number" faqat raqamlar, "-", "+" yoki probellarni qabul qiladi`,
                "any.required": `"phone_number" maydoni talab qilinadi`,
            }),
    })

    return schema.validate(address, { abortEarly: false })
}
