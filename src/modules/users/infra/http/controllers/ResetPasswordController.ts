import { container } from 'tsyringe';
import { Request, Response } from "express";
import { ResetPasswordService } from "../../../services/ResetPasswordService";


export class ResetPasswordController {

    public async create(req: Request, res: Response): Promise<Response> {
        const { password, token, confirmPassword } = req.body;

        const resetPasswordService = container.resolve(ResetPasswordService);

        await resetPasswordService.execute({
            password,
            token,
            confirmPassword
        });

        return res.json({
            message: "Password reset sucessfully.",
        });
    }
}