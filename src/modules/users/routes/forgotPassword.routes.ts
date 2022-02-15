import { Router } from "express";
import { ForgotController } from "../controllers/ForgotController";
import { ResetPasswordController } from "../controllers/ResetPasswordController";

const forgotPasswordRouter = Router();
const forgotPasswordController = new ForgotController();

const resetPasswordController = new ResetPasswordController();

forgotPasswordRouter.post("/forgot", forgotPasswordController.create);
forgotPasswordRouter.post("/reset", resetPasswordController.create);


export { forgotPasswordRouter };
