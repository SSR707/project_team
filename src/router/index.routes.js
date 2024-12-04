import { Router } from "express";
import { 
    addressRouter, 
    authRouter, 
    cartItemRouter, 
    cartRouter, 
    categoryRouter, 
    eventRouter, 
    feedbackRouter, 
    orderRouter, 
    paymentRouter, 
    promocodeRouter, 
    ticketRouter, 
    userRouter, 
    wishlistRouter 
} from "./index.js";
import { authGuard } from "../middleware/index.js";

export const indexRouter = new Router()


indexRouter.use("/auth", authRouter)
indexRouter.use("/user", authGuard, userRouter)
indexRouter.use("/address", authGuard, addressRouter)
indexRouter.use("/cart", authGuard, cartRouter)
indexRouter.use("/cartItem", authGuard, cartItemRouter)
indexRouter.use("/feedback", authGuard, feedbackRouter)
indexRouter.use("/category", authGuard, categoryRouter)
indexRouter.use("/event", authGuard, eventRouter)
indexRouter.use("/order", authGuard, orderRouter)
indexRouter.use("/payment", authGuard, paymentRouter)
indexRouter.use("/promocode", authGuard, promocodeRouter)
indexRouter.use("/ticket", authGuard, ticketRouter)
indexRouter.use("/wishlist", authGuard, wishlistRouter)