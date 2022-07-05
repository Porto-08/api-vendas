import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import { User } from "../infra/typeorm/entities/User";
import { UsersRepository } from "@modules/users/infra/typeorm/repositories/UsersRepository";
import * as Yup from "yup";
import { hash } from "bcryptjs";
import { ICreateUser } from "@modules/users/domain/models/ICreateUser";



export class CreateUserService {
    public async execute({ name, email, password }: ICreateUser): Promise<User> {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required().email(),
            password: Yup.string().required().min(6),
        });

        if (!(await schema.isValid({ name, email, password }))) {
            throw new AppError("Validation error");
        }

        const usersRepository = getCustomRepository(UsersRepository);

        const emailExists = await usersRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError("There is alreay one user with this email. Try to login.");
        }

        const hashPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: hashPassword,
        });

        await usersRepository.save(user);

        return user;
    }
}