import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import * as Yup from "yup";
import { UserTokensRepository } from "../typeorm/repositories/UserTokensRepository";
import { EtheralMail } from "@config/mail/EtheralMail";

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

        const { token } = await userTokensRepository.generate(user.id);

        await EtheralMail.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: "[API-VENDAS] - Recuperação de Senha",
            from: {
                name: "Equipe APi-Vendas",
                email: "equipe@apivendas.com.br",
            },
            templateData: {
                template: "Olá {{name}}: {{token}}",
                variables: {
                    name: user.name,
                    token
                }
            },
        });
    }
}