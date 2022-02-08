import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import { User } from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import * as Yup from "yup";

interface IRequest {
    name: string;
    email: string;
    password: string;
}

export class CreateUserService {
    public async execute({ name, email, password }: IRequest): Promise<User> {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required().email(),
            password: Yup.string().required(),
        });

        if (!(await schema.isValid({ name, email, password }))) {
            throw new AppError("Validation error");
        }

        const usersRepository = getCustomRepository(UsersRepository);

        const emailExists = await usersRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError("There is alreay one user with this email. Try to login.");
        }

        const user = usersRepository.create({
            name,
            email,
            password,
        });

        await usersRepository.save(user);

        return user;
    }
}