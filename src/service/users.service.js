import db from "../database/index.js"

export const UserProfileService = (email) => {
    try {
        return db("users").select("*").where("email", "=", email)
    } catch (error) {
        throw new Error(error)
    }
}

export const getAllUserService = () => {
    try {
        return db("users").select("*")
    } catch (error) {
        throw new Error(error)
    }
}

export const getByIdUserService = (id) => {
    try {
        return db("users").select("*").where("id", "=", id)
    } catch (error) {
        throw new Error(error)
    }
}

export const getPageUserService = (page, limit) => {
    try {
        return db("users").select("*").limit(limit).offset(page)
    } catch (error) {
        throw new Error(error)
    }
}

export const getFilterUserService = (name, value) => {
    try {
        return db("users").select("*").where(name, "=", value)
    } catch (error) {
        throw new Error(error)
    }
}

export const getSearchUserService = (search) => {
    try {
        return db("users")
            .select("*")
            .where("firstname", "ILIKE", `%${search}%`)
    } catch (error) {
        throw new Error(error)
    }
}

export const createUserService = (data) => {
    try {
        return db("users").insert(data).returning("*")
    } catch (error) {
        throw error
    }
}

export const updateUserService = (id, data) => {
    try {
        return db("users").where("id", "=", id).update(data)
    } catch (error) {
        throw new Error(error)
    }
}

export const deleteUserService = (id) => {
    try {
        return db("users").where("id", "=", id).del()
    } catch (error) {
        throw new Error(error)
    }
}
