import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import AppError from "@shared/errors/AppError";
import { User } from "../infra/typeorm/entities/User";
import * as Yup from "yup";
import path from "path";
import uploadConfig from "../../../config/upload";
import fs from "fs";
import { inject, injectable } from "tsyringe";

interface IRequest {
    user_id: string;
    avatarFilename: string;
}
@injectable()
export class UpdateUserAvatarService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    public async execute({ avatarFilename, user_id }: IRequest): Promise<User> {
        const schema = Yup.object().shape({
            avatarFilename: Yup.string().required(),
            user_id: Yup.string().required(),
        });

        if (!(await schema.isValid({ avatarFilename, user_id }))) {
            throw new AppError("Validation error");
        }

        const user = await this.usersRepository.findById(user_id);

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

        await this.usersRepository.save(user);

        return user;
    }
}