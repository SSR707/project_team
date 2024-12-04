import Joi from "joi"

export const orderValidate = (data) => {
    const schema = Joi.object({
        ticket_id: Joi.string().uuid().required().messages({
            "string.guid":
                "Chipta ID (ticket_id) haqiqiy UUID formatida bo'lishi kerak",
            "any.required": "Chipta ID talab qilinadi",
        }),

        total_amount: Joi.number().positive().required().messages({
            "number.base": "Umumiy summa faqat raqam bo'lishi kerak",
            "number.positive": "Umumiy summa ijobiy bo'lishi kerak",
            "any.required": "Umumiy summa talab qilinadi",
        }),

        status: Joi.boolean().required().messages({
            "boolean.base": "Holat faqat 'true' yoki 'false' bo'lishi mumkin",
            "any.required": "Holat talab qilinadi",
        }),
    })

    return schema.validate(data, { abortEarly: false })
}
