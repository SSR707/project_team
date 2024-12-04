import db from "../database/index.js"
export const createOtp = (data) => {
    try {
        return db("otp").insert(data).returning("*")
    } catch (error) {
        throw error
    }
}
export const getOtpService = (email) => {
    try {
        return db("otp").select("*").where("email", "=", email)
    } catch (error) {
        throw error
    }
}

export const deleteOtpService = (id) => {
    try {
        return db("otp").delete().where("id", "=", id)
    } catch (error) {
        throw error
    }
}

export const getUserByEmailService = (email) => {
    try {
        return db("users").select("*").where("email", "=", email)
    } catch (error) {
        throw error
    }
}
