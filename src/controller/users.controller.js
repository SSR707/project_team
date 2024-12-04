import {
    deleteUserService,
    getAllUserService,
    getByIdUserService,
    getFilterUserService,
    getPageUserService,
    getSearchUserService,
    updateUserService,
    UserProfileService,
} from "../service/users.service.js"
import { hashPassword } from "../utils/index.js"
import { logger } from "../utils/logger.js"

export const UserProfileController = async (req, res, next) => {
    try {
        const user = await UserProfileService(req.user.sub)
        return res.status(200).send({ status: "Success", data: user })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}
export const getAllUserController = async (req, res, next) => {
    try {
        const AllData = await getAllUserService()
        return res.status(200).send({ status: "Success", data: AllData })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const getByIdUserController = async (req, res, next) => {
    try {
        const user = await getByIdUserService(req.params.id)
        if (!user) {
            return res.status(404).send("MAlumot Topilmadi")
        }
        return res.status(200).send({ status: "Success", data: user })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const getPageUserController = async (req, res, next) => {
    try {
        const { page, limit } = req.query
        const skip = (page - 1) * limit
        const AllData = await getPageUserService(skip, limit)
        return res.status(200).send({ status: "Success", data: AllData })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const getFilterUserController = async (req, res, next) => {
    try {
        const key = String(Object.keys(req.query)[0])
        const user = await getFilterUserService(key, req.query[key])
        if (!user) {
            return res.status(404).send("Malumot Topilmadi")
        }
        return res.status(200).send({ status: "Success", data: user })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const getSearchUserController = async (req, res, next) => {
    try {
        const search = req.query.firstname || ""
        const user = await getSearchUserService(search)
        if (!user) {
            return res.status(404).send("Malumot Topilmadi")
        }
        return res.status(200).send({ status: "Success", data: user })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const updateUserController = async (req, res, next) => {
    try {
        const user = await getByIdUserService(req.params.id)
        if (!user) {
            return res.status(404).send("Malumot Topilmadi")
        }
        if (req.body.password) {
            return res.status(403).send('Not Access')
        } else {
            const newUserData = { ...user[0], ...req.body }
            const newUser = await updateUserService(req.params.id, newUserData)
        }
        return res.status(200).send({ status: "Success", id: req.params.id })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const deleteUserController = async (req, res, next) => {
    try {
        const user = await getByIdUserService(req.params.id)
        if (!user) {
            return res.status(404).send("Malumot Topilmadi")
        }
        const deleteUser = await deleteUserService(req.params.id)
        return res.status(200).send({ status: "Success", id: user[0].id })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}
