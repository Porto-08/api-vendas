import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "@modules/users/infra/typeorm/repositories/UsersRepository";
import * as Yup from "yup";

interface IRequest {
    id: string;
}

export class DeleteUserService {
    public async execute({ id }: IRequest): Promise<void> {
        const schema = Yup.object().shape({
            id: Yup.string().required(),
        })

        if (!(await schema.isValid({ id }))) {
            throw new AppError("Validation error");
        }

        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne(id);

        if (!user) {
            throw new AppError("User not found.");
        }

        await usersRepository.remove(user);
    }
}