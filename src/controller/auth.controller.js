import {
    accessTokenSing,
    comparePass,
    hashPassword,
    otpGenerate,
    refreshTokenSing,
    refreshTokenVerify,
    sendMail,
} from "../utils/index.js"
import {
    chengePasswordValidation,
    googleValidation,
    loginValidation,
    otpValidation,
    userValidation,
} from "../validator/auth.validation.js"
import {
    createUserService,
    updateUserService,
} from "../service/users.service.js"
import {
    createOtp,
    deleteOtpService,
    getOtpService,
    getUserByEmailService,
} from "../service/auth.service.js"
import { logger } from "../utils/logger.js"

export const googlePassportRegisterController = async (req, res, next) => {
    try {
        const { error } = googleValidation(req.user)
        if (error) {
            return res.status(400).send("Malumotlarni togri kiriting")
        }
        const { firstname, lastname, email, googleId } = req.user
        const currentUser = await getUserByEmailService(email)
        if (currentUser.length !== 0) {
            return res.status(409).send("Bu eamil oldin ham royhatan otilgan")
        }
        const user = await createUserService({
            firstname,
            lastname,
            email,
            google_id: googleId,
            is_active: true,
        })
        const payload = {
            id: user[0].id,
            sub: email,
            role: user[0].role,
        }
        const accessToken = await accessTokenSing(payload)
        const refreshToken = await refreshTokenSing(payload)

        return res.status(200).send({ accessToken, refreshToken })
    } catch (error) {
        console.log(error)
        logger.error(error)
        next(error)
    }
}

export const registerController = async (req, res, next) => {
    try {
        const { error } = userValidation(req.body)
        if (error) {
            return res.status(400).send("Malumotlarni togri kiriting")
        }
        const { email, password } = req.body
        const currentUser = await getUserByEmailService(email)
        if (currentUser.length !== 0) {
            return res.status(409).send("Bu eamil oldin ham royhatan otilgan")
        }
        const otp = otpGenerate()
        sendMail(
            email,
            "OTP",
            `
            <h1>
                This Your otp: 
                <h2 style="background: yellow;color: rgb(0, 0, 0);width: 7%;">${otp}</h2>
            </h1>
            `,
        )
        const hashPass = await hashPassword(password)
        const user = await createUserService({
            ...req.body,
            password: hashPass,
        })
        const otp_db = await createOtp({
            user_id: user[0].id,
            email: user[0].email,
            otp_code: otp,
        })
        return res.status(201).send("Created")
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const loginController = async (req, res, next) => {
    try {
        const { error } = loginValidation(req.body)
        if (error) {
            return res.status(400).send("Malumotlarni Togri Kiriting")
        }
        const { email, password } = req.body
        const currentUser = await getUserByEmailService(email)
        if (currentUser.length === 0) {
            return res.status(404).send("User Topilmadi")
        }
        if (currentUser[0].is_active === false) {
            return res.status(403).send("User is No Active")
        }
        const isEqual = await comparePass(password, currentUser[0].password)

        if (!isEqual) {
            return res.status(403).send("Eamil Yoki Parol hato")
        }
        const payload = {
            id: currentUser[0].id,
            sub: email,
            role: currentUser[0].role,
        }

        const accessToken = await accessTokenSing(payload)
        const refreshToken = await refreshTokenSing(payload)

        return res.status(200).send({ accessToken, refreshToken })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const verifyTokenController = async (req, res, next) => {
    try {
        const { error } = otpValidation(req.body)
        if (error) {
            return res.status(400).send("Malumotlarni gori tartibdda kiriting")
        }
        const { otp, email } = req.body
        const currentUser = await getUserByEmailService(email)
        if (currentUser.length === 0) {
            return res.status(404).send("Malumot topilmadi")
        }
        const currentOtp = await getOtpService(email)
        if (new Date() > currentOtp[0].expires_at) {
            await deleteOtpService(currentOtp[0].id)
            return res.status(403).send("Sixni Otp Codingizni Vohti tuganag")
        }
        if (currentOtp[0].otp_code !== otp) {
            return res.status(401).send("Otp code Xato")
        }
        await deleteOtpService(currentOtp[0].id)
        await updateUserService(currentUser[0].id, { is_active: true })
        return res.status(200).send("User Is Active")
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const sendForgetPasswordOtpController = async (req, res, next) => {
    try {
        let email
        if (req.user && req.user.sub) {
            email = req.user.sub
        } else {
            email = req.body.email
            if(!email){
                return res.status(400).send('Email Must heve')
            }
        }
        const currentUser = await getUserByEmailService(email)
        if (!currentUser) {
            return res.status(404).send({ msg: "Not Found" })
        }
        const otp = otpGenerate()
        sendMail(
            email,
            "OTP",
            `
            <h1>
                This Your otp: 
                <h2 style="background: yellow;color: rgb(0, 0, 0);width: 7%;">${otp}</h2>
            </h1>
            `,
        )
        const otp_db = await createOtp({
            user_id: currentUser[0].id,
            email: email,
            otp_code: otp,
        })
        req.session.confirumPassword = email
        return res.status(200).send({ msg: "send Otp", redirect: "/verifyOtp" })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const verifyOtpController = async (req, res, next) => {
    try {
        if (!req.session.confirumPassword) {
            return res.status(400).send({
                msg: "Not Access",
                redirect: "/send-forget-password-otp",
            })
        }
        const { otp } = req.body
        if(!otp){
            return res.status(400).send('Otp must heve')
        }
        const currentOtp = await getOtpService(req.session.confirumPassword)
        if (!currentOtp) {
            return res.status(404).send("Otp code topilmadi")
        }
        if (otp !== currentOtp[0].otp_code) {
            return res.status(400).send("Otp Xato! kiritilgan")
        }
        if (new Date() > currentOtp[0].expires_at) {
            await deleteOtpService(currentOtp[0].id)
            return res.status(403).send("Sixni Otp Codingizni Vohti tuganag")
        }
        req.session.verifiedEmail = req.session.confirumPassword
        await deleteOtpService(currentOtp[0].id)
        return res
            .status(200)
            .send({ msg: "sen Otp", redirect: "/forgetPassword" })
    } catch (error) {
        next(error)
    }
}

export const forgetPasswordController = async (req, res, next) => {
    try {
        const verifiedEmail = req.session.verifiedEmail
        if (!verifiedEmail) {
            return res.status(403).send("Not Access Verify otp")
        }
        const { password } = req.body
        if(!password){
            return res.status(400).send('Password must Heve')
        }
        const user = await getUserByEmailService(verifiedEmail)
        const hashPass = await hashPassword(password)
        const newPass = { ...user[0], password: hashPass }
        await updateUserService(user[0].id, newPass)
        req.session.verifiedEmail = null
        return res.status(200).send({ msg: "Password Update" })
    } catch (error) {
        next(error)
    }
}

export const chengePasswordController = async (req, res, next) => {
    try {
        const {error} = chengePasswordValidation(req.body)
        if(error){
            return res.status(400).send({msg:'Malumotlarni Togri kiriting '})
        }
        const { oldPassword, password } = req.body
        const currentUser = await getUserByEmailService(req.user.sub)
        if (!currentUser) {
            return res.status(404).send("User Not found")
        }
        const isEqual = await comparePass(oldPassword, currentUser[0].password)
        if (!isEqual) {
            return res.status(400).send("Eski parol Xato!")
        }

        const hashPass = await hashPassword(password)
        const newPass = { ...currentUser[0], password: hashPass }
        await updateUserService(currentUser[0].id, newPass)
        return res.status(200).send({ msg: "Password Update" })
    } catch (error) {
        next(error)
    }
}

export const refreshToken = async (req, res, next) => {
    try {
        const { token } = req.body
        if(!token){
            return res.status(404).send('Refresh token must heve')
        }
        const newToken = await refreshTokenVerify(token)
        return res.status(200).send({accessToken:newToken.accessToken , refreshToken:newToken.refreshToken})
    } catch (error) {
        next(error)
    }
}
