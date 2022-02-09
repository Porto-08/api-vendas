import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import { User } from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import * as Yup from "yup";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        id: string;
        name: string;
    }
    token: string;
}

export class CreateSessionService {
    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const schema = Yup.object().shape({
            email: Yup.string().required().email(),
            password: Yup.string().required().min(6),
        });

        if (!(await schema.isValid({ email, password }))) {
            throw new AppError("Validation error");
        }

        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email/Password incorrect", 401);
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError("Email/Password incorrect", 401);
        }

        const token = sign({ id: user.id, name: user.name }, "5bd15802babb5c76daca56a45099167d", {
            subject: user.id,
            expiresIn: "7d",
        });

        return {
            user: {
                id: user.id,
                name: user.name,
            },
            token,
        };
    }
}