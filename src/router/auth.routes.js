import { Router } from "express"
import {
    chengePasswordController,
    forgetPasswordController,
    googlePassportRegisterController,
    loginController,
    refreshToken,
    registerController,
    sendForgetPasswordOtpController,
    verifyOtpController,
    verifyTokenController,
} from "../controller/auth.controller.js"
import passport from "passport"
import "../strategies/passport-google.js"
import { authGuard} from "../middleware/index.js"

export const authRouter = Router()

authRouter.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] }),
)
authRouter.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login",
        session: false,
    }),
    googlePassportRegisterController,
)
authRouter.post('/register', registerController)
authRouter.post('/login', loginController)
authRouter.post('/verifyToken', verifyTokenController)
authRouter.post('/send-forget-password-otp' , sendForgetPasswordOtpController)
authRouter.post('/verifyOtp', verifyOtpController)
authRouter.post('/forgetPassword', forgetPasswordController)
authRouter.post('/changePassword', authGuard ,chengePasswordController)
authRouter.post('/refreshToken' , refreshToken)