import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import { User } from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import * as Yup from "yup";
import path from "path";
import uploadConfig from "../../../config/upload";
import fs from "fs";

interface IRequest {
    user_id: string;
    avatarFilename: string;
}

export class UpdateUserAvatarService {
    public async execute({ avatarFilename, user_id }: IRequest): Promise<User> {
        const schema = Yup.object().shape({
            avatarFilename: Yup.string().required(),
            user_id: Yup.string().required(),
        });

        if (!(await schema.isValid({ avatarFilename, user_id }))) {
            throw new AppError("Validation error");
        }

        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("User not found.", 401);
        }

        // verificando de já há um avatar e excluindo
        if (user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;

        await usersRepository.save(user);

        return user;
    }
}