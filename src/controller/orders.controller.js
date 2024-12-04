import { OrderService } from "../service/orders.service.js"
import { logger } from "../utils/logger.js"

const responseHandler = (result, res) => {
    if (!result.success) {
        return res.status(result.status).send(result.message)
    }
    return res.status(result.status).send(result.message)
}

export const OrderController = {
    create: async (req, res, next) => {
        try {
            const data = req.validatedData
            const result = await OrderService.create({
                user_id: req.user.id,
                ...data,
            })
            responseHandler(result, res)
        } catch (error) {
            logger.error(error)
            next(error)
        }
    },
    getAll: async (req, res, next) => {
        try {
            const page = req.query.page
            const limit = req.query.limit 
            let key;
            if(!page && !limit){
                key = String(Object.keys(req.query)[0])
            }else if(!page || !limit){
                key = String(Object.keys(req.query)[1])
            }
            else{
                key = String(Object.keys(req.query)[2])
            }
            const result = await OrderService.getAll(page, limit, key , req.query[key])
            responseHandler(result, res)
        } catch (error) {
            logger.error(error)
            next(error)
        }
    },
    getOne: async (req, res, next) => {
        try {
            const id = req.params.id
            const result = await OrderService.getOne(id)
            responseHandler(result, res)
        } catch (error) {
            logger.error(error)
            next(error)
        }
    },
    update: async (req, res, next) => {
        try {
            const id = req.params.id
            const data = req.validatedData
            const result = await OrderService.update(id, data)
            responseHandler(result, res)
        } catch (error) {
            logger.error(error)
            next(error)
        }
    },
    delete: async (req, res, next) => {
        try {
            const id = req.params.id
            const result = await OrderService.delete(id)
            responseHandler(result, res)
        } catch (error) {
            logger.error(error)
            next(error)
        }
    },
}