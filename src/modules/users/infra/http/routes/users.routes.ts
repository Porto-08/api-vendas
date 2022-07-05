import { Router } from "express";
import { UsersController } from "@modules/users/infra/http/controllers/UsersController";
import { isAuthenticated } from "@shared/infra/http/middlewares/isAuthenticated";
import { UsersAvatarController } from "@modules/users/infra/http/controllers/UserAvatarController";

import multer from "multer";
import uploadConfig from "../../../../../config/upload";

const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();

const upload = multer(uploadConfig);

usersRouter.post("/", usersController.create);

usersRouter.use(isAuthenticated)

usersRouter.get("/", usersController.index);
usersRouter.get("/:id", usersController.show);
usersRouter.put("/:id", usersController.update);
usersRouter.delete("/:id", usersController.delete);

// avatar
usersRouter.patch("/avatar", upload.single('avatarFilename'), usersAvatarController.update);

export { usersRouter };