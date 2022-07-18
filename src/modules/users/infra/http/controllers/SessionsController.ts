import { container } from 'tsyringe';
import { Request, Response } from "express";
import { CreateSessionService } from "../../../services/CreateSessionService";

export class SessionsController {

    public async login(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        const createSessionService = container.resolve(CreateSessionService);

        const user = await createSessionService.execute({
            email,
            password
        });

        return res.json(user);
    }
}