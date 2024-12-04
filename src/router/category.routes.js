import express from "express"
import { CategoryController } from "../controller/category.controller.js"
import { roleGuard, validateRequest } from "../middleware/index.js"
import { categoryValidation } from "../validator/category.validation.js"

export const categoryRouter = express.Router()

categoryRouter.get("/", CategoryController.getAll)
categoryRouter.get("/:id", CategoryController.getOne)
categoryRouter.post(
    "/",
    roleGuard("admin"),
    validateRequest(categoryValidation),
    CategoryController.create,
)
categoryRouter.put(
    "/:id",
    roleGuard("admin"),
    validateRequest(categoryValidation),
    CategoryController.update,
)
categoryRouter.delete("/:id", roleGuard("admin"), CategoryController.delete)
