import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { User } from "../infra/typeorm/entities/User";
import { hash } from "bcryptjs";
import { ICreateUser } from "@modules/users/domain/models/ICreateUser";
import { inject, injectable } from "tsyringe";
import * as Yup from "yup";
import AppError from "@shared/errors/AppError";


@injectable()
export class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    public async execute({ name, email, password }: ICreateUser): Promise<User> {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required().email(),
            password: Yup.string().required().min(6),
        });

        if (!(await schema.isValid({ name, email, password }))) {
            throw new AppError("Validation error");
        }

        const emailExists = await this.usersRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError("There is alreay one user with this email. Try to login.");
        }

        const hashPassword = await hash(password, 8);

        const user = this.usersRepository.create({
            name,
            email,
            password: hashPassword,
        });

        return user;
    }
}