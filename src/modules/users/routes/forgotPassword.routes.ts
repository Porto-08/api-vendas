import { Router } from "express";
import { ForgotController } from "../controllers/ForgotController";

const forgotPasswordRouter = Router();
const forgotPasswordController = new ForgotController();

forgotPasswordRouter.post("/forgot", forgotPasswordController.create);

export { forgotPasswordRouter };
