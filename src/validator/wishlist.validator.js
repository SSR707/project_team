import Joi from "joi"

export const wishlistValidate = (data) => {
    const schema = Joi.object({
        ticket_id: Joi.string().uuid().required().messages({
            "string.guid":
                "Chipta ID (ticket_id) haqiqiy UUID formatida bo'lishi kerak",
            "any.required": "Chipta ID talab qilinadi",
        }),
    })

    return schema.validate(data, { abortEarly: false })
}
