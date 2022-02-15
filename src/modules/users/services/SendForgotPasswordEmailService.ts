import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import * as Yup from "yup";
import { UserTokensRepository } from "../typeorm/repositories/UserTokensRepository";

interface IRequest {
    email: string;
}

export class SendForgotPasswordEmailService {
    public async execute({ email }: IRequest): Promise<void> {
        const schema = Yup.object().shape({
            email: Yup.string().required().email(),
        });

        if (!(await schema.isValid({ email }))) {
            throw new AppError("Validation error");
        }

        const usersRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository);

        const user = await usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("user does not exists.");
        }

        const token = await userTokensRepository.generate(user.id);

        console.log(token);
    }
}