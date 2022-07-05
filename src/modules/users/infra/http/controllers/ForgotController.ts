import { Request, Response } from "express";
import { SendForgotPasswordEmailService } from "../../../services/SendForgotPasswordEmailService";


export class ForgotController {

    public async create(req: Request, res: Response): Promise<Response> {
        const { email } = req.body;

        const sendForgotPasswordEmailService = new SendForgotPasswordEmailService();

        await sendForgotPasswordEmailService.execute({
            email,
        });

        return res.json({
            message: "Email sent with instructions to reset password sucessfully.",
        });
    }

}