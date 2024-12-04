import Joi from "joi"

export const cartItemValidator = (cartItem) => {
    const schema = Joi.object({
        cart_id: Joi.string().uuid().required().messages({
            "string.empty": `"cart_id" bo'sh bo'lishi mumkin emas`,
            "string.uuid": `"cart_id" UUID formatida bo'lishi kerak`,
            "any.required": `"cart_id" maydoni talab qilinadi`,
        }),
        ticket_id: Joi.string().uuid().required().messages({
            "string.empty": `"ticket_id" bo'sh bo'lishi mumkin emas`,
            "string.uuid": `"ticket_id" UUID formatida bolishi kerak`,
            "any.required": `"ticket_id" maydoni talab qilinadi`,
        }),
        quantity: Joi.number().integer().min(1).required().messages({
            "number.base": `"quantity" butun son bo'lishi kerak`,
            "number.integer": `"quantity" butun son bo'lishi kerak`,
            "number.min": `"quantity" qiymati kamida 1 bo'lishi kerak`,
            "any.required": `"quantity" maydoni talab qilinadi`,
        }),
    })

    return schema.validate(cartItem, { abortEarly: false })
}
