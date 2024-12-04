import Joi from "joi"

export const cartValidator = (cart) => {
    const schema = Joi.object({
        total: Joi.number().min(0).required().messages({
            "number.base": `"total" son bo'lishi kerak`,
            "number.min": `"total" qiymati 0 yoki undan katta bo'lishi kerak`,
            "any.required": `"total" maydoni talab qilinadi`,
        }),
    })

    return schema.validate(cart, { abortEarly: false })
}
