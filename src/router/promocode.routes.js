import { Router } from "express"
import { PromocodeController } from "../controller/promocode.controller.js"
import { roleGuard, validateRequest } from "../middleware/index.js"
import { promocodeValidator } from "../validator/promocode.validator.js"

export const promocodeRouter = Router()

promocodeRouter.get("/", PromocodeController.getAll)
promocodeRouter.get("/:id", PromocodeController.getOne)
promocodeRouter.post(
    "/",
    roleGuard("admin"),
    validateRequest(promocodeValidator),
    PromocodeController.create,
)
promocodeRouter.put(
    "/:id",roleGuard("admin"),
    validateRequest(promocodeValidator),
    PromocodeController.update,
)
promocodeRouter.delete("/:id",roleGuard("admin"), PromocodeController.delete)
