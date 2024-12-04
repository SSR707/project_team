import { Router } from "express"
import { CartItemController } from "../controller/cart_item.controller.js"
import { validateRequest } from "../middleware/validate.middleware.js"
import { roleGuard } from "../middleware/index.js"
import { cartItemValidator } from "../validator/cart_item.validator.js";

export const cartItemRouter = Router()

cartItemRouter.get("/", CartItemController.getAll)
cartItemRouter.get("/:id", CartItemController.getOne)
cartItemRouter.post("/", roleGuard('admin'), validateRequest(cartItemValidator), CartItemController.create)
cartItemRouter.put("/:id",roleGuard('admin'), validateRequest(cartItemValidator), CartItemController.update)
cartItemRouter.delete("/:id", roleGuard('admin'), CartItemController.delete)
