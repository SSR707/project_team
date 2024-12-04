import Joi from "joi"

export const promocodeValidator = (promocode) => {
    const schema = Joi.object({
        promocode: Joi.string().max(255).required().messages({
            "string.empty": "\"promocode\" bo'sh bo'lishi mumkin emas",
            "string.max":
                '"promocode" uzunligi 255 ta belgidan oshmasligi kerak',
            "any.required": '"promocode" maydoni talab qilinadi',
        }),
        ticket_id: Joi.string().uuid().required().messages({
            "string.empty": "\"ticket_id\" bo'sh bo'lishi mumkin emas",
            "string.uuid": '"ticket_id" UUID formatida bo\'lishi kerak',
            "any.required": '"ticket_id" maydoni talab qilinadi',
        }),
        user_id: Joi.string().uuid().required().messages({
            "string.empty": "\"user_id\" bo'sh bo'lishi mumkin emas",
            "string.uuid": '"user_id" UUID formatida bo\'lishi kerak',
            "any.required": '"user_id" maydoni talab qilinadi',
        }),
        discount: Joi.number().precision(2).required().messages({
            "number.base": '"discount" raqam bo\'lishi kerak',
            "number.precision":
                '"discount" 2 ta kasr raqamidan oshmasligi kerak',
            "any.required": '"discount" maydoni talab qilinadi',
        }),
        status: Joi.boolean().required().messages({
            "any.required": '"status" maydoni talab qilinadi',
        }),
    })

    return schema.validate(promocode, { abortEarly: false })
}
