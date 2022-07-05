import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import { isAfter, addHours } from "date-fns"
import { UsersRepository } from "@modules/users/infra/typeorm/repositories/UsersRepository";
import * as Yup from "yup";
import { UserTokensRepository } from "@modules/users/infra/typeorm/repositories/UserTokensRepository";
import { hash } from "bcryptjs";

interface IRequest {
    password: string;
    confirmPassword: string;
    token: string;
}

export class ResetPasswordService {
    public async execute({ password, token, confirmPassword }: IRequest): Promise<void> {
        const schema = Yup.object().shape({
            password: Yup.string().required().min(6),
            token: Yup.string().required(),
            confirmPassword: Yup.string().required().oneOf([Yup.ref('password')])
        });

        if (!(await schema.isValid({ password, token, confirmPassword }))) {
            throw new AppError("Validation error");
        }

        const usersRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository);

        const userToken = await userTokensRepository.findByToken(token);

        if (!userToken) {
            throw new AppError("User token does not exists.");
        }

        const user = await usersRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError("User does not exists.")
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError("Token expired, restart again.");
        }

        user.password = await hash(password, 8);

        await usersRepository.save(user);
    }
}