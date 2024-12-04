import { createTransport } from "nodemailer"
import { config } from "../../config/index.js"

const transporter = createTransport({
    service: "gmail",
    auth: {
        user: config.eamil.user,
        pass: config.eamil.pass,
    },
})

export const sendMail = async (to, subject, html) => {
    const info = await transporter.sendMail({
        from: config.eamil.user,
        to,
        subject,
        html,
    })
}
