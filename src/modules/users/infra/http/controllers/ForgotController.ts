import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendForgotPasswordEmailService } from "../../../services/SendForgotPasswordEmailService";


export class ForgotController {

    public async create(req: Request, res: Response): Promise<Response> {
        const { email } = req.body;

        const sendForgotPasswordEmailService = container.resolve(SendForgotPasswordEmailService);

        await sendForgotPasswordEmailService.execute({
            email,
        });

        return res.json({
            message: "Email sent with instructions to reset password sucessfully.",
        });
    }

}