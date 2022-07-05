import { Request, Response } from "express";
import { CreateSessionService } from "../../../services/CreateSessionService";

export class SessionsController {

    public async login(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        const createSessionService = new CreateSessionService();

        const user = await createSessionService.execute({
            email,
            password
        });

        return res.json(user);
    }
}