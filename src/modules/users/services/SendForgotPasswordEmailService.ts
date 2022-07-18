import { IUserToken } from './../domain/models/IUserToken';
import { IUsersTokenRepository } from '@modules/users/domain/repositories/IUsersTokenRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import { UsersRepository } from "@modules/users/infra/typeorm/repositories/UsersRepository";
import * as Yup from "yup";
import { EtheralMail } from "@config/mail/EtheralMail";
import path from "path";
import { inject, injectable } from "tsyringe";

interface IRequest {
    email: string;
}

@injectable()
export class SendForgotPasswordEmailService {
    constructor(
        @inject('UsersTokensRepository')
        private usersTokensRepository: IUsersTokenRepository,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    public async execute({ email }: IRequest): Promise<void> {
        const schema = Yup.object().shape({
            email: Yup.string().required().email(),
        });

        if (!(await schema.isValid({ email }))) {
            throw new AppError("Validation error");
        }

        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("User does not exists.");
        }

        const { token } = await this.usersTokensRepository.generate(user.id);

        const forgotPasswordTemplate = path.resolve(__dirname, "..", "views", "forgot_password.hbs");

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
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    from: "Equipe API-Vendas",
                    link: `${process.env.APP_API_URL}/reset_password?token=${token}`,
                }
            },
        });
    }
}