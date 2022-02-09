import { Router } from "express";
import { UsersController } from "../controllers/UsersController";
import { isAuthenticated } from "../../../shared/http/middlewares/isAuthenticated";

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post("/", usersController.create);

usersRouter.get("/", isAuthenticated, usersController.index);
usersRouter.get("/:id", isAuthenticated, usersController.show);
// usersRouter.put("/:id", isAuthenticated, usersController.update);
usersRouter.delete("/:id", isAuthenticated, usersController.delete);


export { usersRouter };