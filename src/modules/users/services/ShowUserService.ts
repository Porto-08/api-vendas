import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import AppError from "@shared/errors/AppError";
import { User } from "@modules/users/infra/typeorm/entities/User";
import * as Yup from "yup";
import { inject, injectable } from "tsyringe";

interface IRequest {
    id: string;
}

@injectable()
export class ShowUserService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }


    public async execute({ id }: IRequest): Promise<User | undefined> {
        const schema = Yup.object().shape({
            id: Yup.string().required(),
        })

        if (!(await schema.isValid({ id }))) {
            throw new AppError("Validation error");
        }

        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new AppError("User not found.");
        }

        return user;
    }
}