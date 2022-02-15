import { Router } from "express";
import { ForgotController } from "../controllers/ForgotController";
import { ResetPasswordController } from "../controllers/ResetPasswordController";

const passwordRouter = Router();
const forgotPasswordController = new ForgotController();

const resetPasswordController = new ResetPasswordController();

passwordRouter.post("/forgot", forgotPasswordController.create);
passwordRouter.post("/reset", resetPasswordController.create);


export { passwordRouter };
