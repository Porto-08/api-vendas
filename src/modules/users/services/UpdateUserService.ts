import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import AppError from "@shared/errors/AppError";
import { User } from "../infra/typeorm/entities/User";
import * as Yup from "yup";
import { compare, hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

interface IRequest {
    id: string;
    name?: string;
    email?: string;
    password?: string;
    oldPassword?: string;
}

@injectable()
export class UpdateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }


    public async execute({
        id,
        name,
        email,
        password,
        oldPassword
    }: IRequest): Promise<User | undefined> {
        const schema = Yup.object().shape({
            id: Yup.string().required(),
            name: Yup.string(),
            email: Yup.string().email(),
            password: Yup.string().min(6),
            oldPassword: Yup.string().min(6).when("password", (password, field) => {
                return password ? field.required() : field;
            })
        })

        if (!(await schema.isValid({ id, name, email, password, oldPassword }))) {
            throw new AppError("Validation error");
        }

        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new AppError("User not found.");
        }

        if (email && email !== user.email) {
            const userWithEmail = await this.usersRepository.findByEmail(email);

            if (userWithEmail) {
                throw new AppError("Email already in use.");
            }
        }

        if (password && oldPassword && user.password) {
            const isOldPasswordValid = await compare(oldPassword, user.password);

            if (!isOldPasswordValid) {
                throw new AppError("Old password does not match.");
            }

            user.password = await hash(password, 8);
        }

        user.name = name || user.name;
        user.email = email || user.email;

        await this.usersRepository.save(user);

        return user;
    }
}