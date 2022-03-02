import { Request, Response } from "express";
import { CreateSessionService } from "../services/CreateSessionService";
import { CreateUserService } from "../services/CreateUserService";
import { DeleteUserService } from "../services/DeleteUserService";
import { ListUserService } from "../services/ListUserService";
import { ShowUserService } from "../services/ShowUserService";
import { UpdateUserService } from "../services/UpdateUserService";
import { instanceToInstance } from "class-transformer";

export class UsersController {
    public async index(req: Request, res: Response): Promise<Response> {
        const listUserService = new ListUserService();

        const users = await listUserService.execute();

        return res.json(instanceToInstance(users));
    }

    public async show(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const showUserService = new ShowUserService();

        const user = await showUserService.execute({
            id
        });

        return res.json(instanceToInstance(user));
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const { name, email, password } = req.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({
            name,
            email,
            password
        });

        return res.json(instanceToInstance(user));
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.user;
        const { name, email, password, oldPassword } = req.body;

        const updateUserService = new UpdateUserService();

        const user = await updateUserService.execute({
            id,
            name,
            email,
            password,
            oldPassword
        });

        return res.json(instanceToInstance(user));
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const deleteUserService = new DeleteUserService();

        await deleteUserService.execute({
            id
        });

        return res.status(204).send();
    }
}