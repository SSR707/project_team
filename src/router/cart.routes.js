import { Router } from "express"
import { CartController } from "../controller/cart.controller.js"
import { validateRequest } from "../middleware/validate.middleware.js"
import { cartValidator } from "../validator/cart.validator.js"
import { roleGuard } from "../middleware/index.js"

export const cartRouter = Router()

cartRouter.get("/", CartController.getAll)
cartRouter.get("/:id", CartController.getOne)
cartRouter.post("/", roleGuard('admin'), validateRequest(cartValidator), CartController.create)
cartRouter.put("/:id", roleGuard('admin'), validateRequest(cartValidator), CartController.update)
cartRouter.delete("/:id", roleGuard('admin'), CartController.delete)
