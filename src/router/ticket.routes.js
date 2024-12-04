import { Router } from "express"
import { TicketController } from "../controller/ticket.controller.js"
import { validateRequest,cheackMiddleware } from "../middleware/index.js"
import { ticketValidator } from "../validator/ticket.validator.js"

export const ticketRouter = Router()

ticketRouter.get("/", TicketController.getAll)
ticketRouter.get("/:id", TicketController.getOne)
ticketRouter.post("", validateRequest(ticketValidator), TicketController.create)
ticketRouter.put("/:id",cheackMiddleware, validateRequest(ticketValidator), TicketController.update)
ticketRouter.delete("/:id",cheackMiddleware, TicketController.delete)
