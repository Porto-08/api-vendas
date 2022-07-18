import { container } from 'tsyringe';
import { Request, Response } from "express";
import { UpdateUserAvatarService } from "../../../services/UpdateUserAvatarService";


export class UsersAvatarController {
    public async update(req: Request, res: Response): Promise<Response> {
        const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

        const user = await updateUserAvatarService.execute({
            user_id: req.user.id,
            avatarFilename: req.file?.filename as string,
        })

        return res.json(user);
    }
}