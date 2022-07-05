import { Router } from "express";
import { ForgotController } from "@modules/users/infra/http/controllers/ForgotController";
import { ResetPasswordController } from "@modules/users/infra/http/controllers/ResetPasswordController";

const passwordRouter = Router();
const forgotPasswordController = new ForgotController();

const resetPasswordController = new ResetPasswordController();

passwordRouter.post("/forgot", forgotPasswordController.create);
passwordRouter.post("/reset", resetPasswordController.create);


export { passwordRouter };
