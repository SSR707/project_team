import express from "express"
import {
    UserProfileController,
    getAllUserController,
    getByIdUserController,
    getPageUserController,
    getFilterUserController,
    getSearchUserController,
    updateUserController,
    deleteUserController,
} from "../controller/users.controller.js"
import { cheackMiddleware, roleGuard } from "../middleware/index.js"

export const userRouter = express.Router()

userRouter.get("/profile", UserProfileController)
userRouter.get("/page", roleGuard("admin"), getPageUserController)
userRouter.get("/filter", roleGuard("admin"), getFilterUserController)
userRouter.get("/search", roleGuard("admin"), getSearchUserController)
userRouter.get("/", roleGuard("admin"), getAllUserController)
userRouter.get("/:id", roleGuard("admin"), getByIdUserController)
userRouter.put("/:id", cheackMiddleware, updateUserController)
userRouter.delete("/:id", roleGuard("admin"), deleteUserController)
