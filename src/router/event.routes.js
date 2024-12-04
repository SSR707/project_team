import { Router } from "express"
import { EventController } from "../controller/event.controller.js"
import { validateRequest,roleGuard } from "../middleware/index.js"
import { eventValidator } from "../validator/event.validator.js";

export const eventRouter = Router()

eventRouter.get("/", EventController.getAll)
eventRouter.get("/:id", EventController.getOne)
eventRouter.post("",roleGuard("admin"), validateRequest( eventValidator ), EventController.create)
eventRouter.put("/:id", roleGuard("admin"), validateRequest( eventValidator ), EventController.update)
eventRouter.delete("/:id",roleGuard("admin"), EventController.delete)
