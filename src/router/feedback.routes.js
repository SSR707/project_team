import express from "express"
import { FeedBackController } from "../controller/feedback.controller.js"
import { cheackMiddleware, roleGuard, validateRequest } from "../middleware/index.js"
import { feedbackValidation } from "../validator/feedback.validation.js"

export const feedbackRouter = express.Router()

feedbackRouter.get("/", FeedBackController.getAll)
feedbackRouter.get("/:id", FeedBackController.getOne)
feedbackRouter.post(
    "/",
    validateRequest(feedbackValidation),
    FeedBackController.create,
)
feedbackRouter.put(
    "/:id",
    cheackMiddleware,
    validateRequest(feedbackValidation),
    FeedBackController.update,
)
feedbackRouter.delete("/:id", roleGuard("admin"), FeedBackController.delete)
