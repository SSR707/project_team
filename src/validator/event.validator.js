import Joi from "joi"

export const eventValidator = (event) => {
    const schema = Joi.object({
        name: Joi.string().max(255).required().messages({
            "string.empty": `"name" bo'sh bo'lishi mumkin emas`,
            "string.max": `"name" uzunligi 255 ta belgidan oshmasligi kerak`,
            "any.required": `"name" maydoni talab qilinadi`,
        }),
        description: Joi.string().max(1000).allow(null, "").messages({
            "string.max":
                `"description" uzunligi 1000 ta belgidan oshmasligi kerak`,
        }),
        location: Joi.string().max(255).required().messages({
            "string.empty": `"location" bo'sh bo'lishi mumkin emas`,
            "string.max":
                `"location" uzunligi 255 ta belgidan oshmasligi kerak`,
            "any.required": `"location" maydoni talab qilinadi`,
        }),
        date: Joi.date().required().messages({
            "date.base": `"date" to'g'ri sana formatida bo'lishi kerak`,
            "any.required": `"date" maydoni talab qilinadi`,
        }),
        time: Joi.string()
            .pattern(/^([0-9]{2}):([0-9]{2})$/)
            .required()
            .messages({
                "string.empty": `"time" bo'sh bo'lishi mumkin emas`,
                "string.pattern.base":
                    `"time" formatida bo'lishi kerak (HH:MM)`,
                "any.required": `"time" maydoni talab qilinadi`,
            }),
        total_tickets: Joi.number().integer().min(0).required().messages({
            "number.base": `"totalTickets" butun son bo'lishi kerak`,
            "number.min": `"totalTickets" 0 dan kichik bo'lishi mumkin emas`,
            "any.required": `"totalTickets" maydoni talab qilinadi`,
        }),
        available_tickets: Joi.number().integer().min(0).required().messages({
            "number.base": `"availableTickets" butun son bo'lishi kerak`,
            "number.min":
                `"availableTickets" 0 dan kichik bo'lishi mumkin emas`,
            "any.required": `"availableTickets" maydoni talab qilinadi`,
        }),
        category_id: Joi.string().uuid().required().messages({
            "string.empty": `"category_id" bo'sh bo'lishi mumkin emas`,
            "string.uuid": `"category_id" UUID formatida bo'lishi kerak`,
            "any.required": `"category_id" maydoni talab qilinadi`,
        }),
    })

    return schema.validate(event, { abortEarly: false })
}
