import express from "express"
import session from 'express-session'
import morgan from "morgan"
import { indexRouter } from "./router/index.routes.js"
import { config } from "./config/index.js"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))
app.use(
    session({
        secret: config.session.secret,
        resave: false, 
        saveUninitialized: true, 
        cookie: { 
            secure: false, 
            maxAge: 1000 * 60 * 10 
        },
    })
);
app.use('/' , (req , res) => {
    res.send('Samanadr ni server ishga tushdi')
})
app.use("/api/v1", indexRouter)

app.use((req, res) => {
    res.status(404).send("Not found")
})

app.use((err, req, res, next) => {
    if (err) return res.status(500).send(err.message)
    res.status(404).send("Not found")
})

process.on("uncaughtException", (err) => {
    console.error("Kutilmagan xatolik:", err.message)
    process.exit(1)
})

process.on("unhandledRejection", (reason, promise) => {
    console.error("Promise bajarilmagan:", reason)
    process.exit(1)
})

export default app