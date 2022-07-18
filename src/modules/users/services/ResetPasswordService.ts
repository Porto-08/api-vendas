import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { IUsersTokenRepository } from '@modules/users/domain/repositories/IUsersTokenRepository';
import AppError from "@shared/errors/AppError";
import { isAfter, addHours } from "date-fns"
import * as Yup from "yup";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

interface IRequest {
    password: string;
    confirmPassword: string;
    token: string;
}

@injectable()
export class ResetPasswordService {
    constructor(
        @inject('UsersTokenRepository')
        private usersTokenRepository: IUsersTokenRepository,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    public async execute({ password, token, confirmPassword }: IRequest): Promise<void> {
        const schema = Yup.object().shape({
            password: Yup.string().required().min(6),
            token: Yup.string().required(),
            confirmPassword: Yup.string().required().oneOf([Yup.ref('password')])
        });

        if (!(await schema.isValid({ password, token, confirmPassword }))) {
            throw new AppError("Validation error");
        }

        const userToken = await this.usersTokenRepository.findByToken(token);

        if (!userToken) {
            throw new AppError("User token does not exists.");
        }

        const user = await this.usersRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError("User does not exists.")
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError("Token expired, restart again.");
        }

        user.password = await hash(password, 8);

        await this.usersRepository.save(user);
    }
}