import Joi from "joi"

export const paymentValidate = (data) => {
    const schema = Joi.object({
        order_id: Joi.string().uuid().required().messages({
            "string.guid":
                "Chipta ID (order_id) haqiqiy UUID formatida bo'lishi kerak",
            "any.required": "Order ID talab qilinadi",
        }),

        amount: Joi.number().positive().required().messages({
            "number.base": "To'lov summasi faqat raqam bo'lishi kerak",
            "number.positive": "To'lov summasi ijobiy bo'lishi kerak",
            "any.required": "To'lov summasi talab qilinadi",
        }),

        method: Joi.string()
            .valid("credit_card", "paypal", "cash")
            .required()
            .messages({
                "any.only":
                    "To'lov usuli faqat 'credit_card', 'paypal', yoki 'cash' bo'lishi mumkin",
                "any.required": "To'lov usuli talab qilinadi",
            }),

        status: Joi.boolean().required().messages({
            "boolean.base": "Holat faqat 'true' yoki 'false' bo'lishi mumkin",
            "any.required": "Holat talab qilinadi",
        }),
    })

    return schema.validate(data, { abortEarly: false })
}
