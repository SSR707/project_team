import { Router } from "express"
import { AddressController } from "../controller/address.controller.js"
import { validateRequest } from "../middleware/validate.middleware.js"
import { cheackMiddleware, roleGuard } from "../middleware/index.js"
import { addressValidator } from "../validator/address.validator.js";

export const addressRouter = Router()

addressRouter.get("/", roleGuard("admin"), AddressController.getAll)
addressRouter.get("/:id", AddressController.getOne)
addressRouter.post("/", validateRequest(addressValidator), AddressController.create)
addressRouter.put("/:id", cheackMiddleware, validateRequest(addressValidator), AddressController.update)
addressRouter.delete("/:id", cheackMiddleware, AddressController.delete)
