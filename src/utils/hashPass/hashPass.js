import { hash, genSalt, compare } from "bcrypt"

const generateSalt = async () => await genSalt(10)

export const hashPassword = async (password) => {
    const salt = await generateSalt()
    return hash(password, salt)
}

export const comparePass = (userPassword, password) => {
    return compare(userPassword, password)
}
