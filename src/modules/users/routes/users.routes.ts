import { Router } from "express";
import { UsersController } from "../controllers/UsersController";
import { isAuthenticated } from "../../../shared/http/middlewares/isAuthenticated";
import { UsersAvatarController } from "../controllers/UserAvatarController";

import multer from "multer";
import uploadConfig from "../../../config/upload";

const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();

const upload = multer(uploadConfig);

usersRouter.post("/", usersController.create);

usersRouter.get("/", isAuthenticated, usersController.index);
usersRouter.get("/:id", isAuthenticated, usersController.show);
usersRouter.delete("/:id", isAuthenticated, usersController.delete);

// avatar
usersRouter.patch("/avatar", isAuthenticated, upload.single('avatar'), usersAvatarController.update);

export { usersRouter };