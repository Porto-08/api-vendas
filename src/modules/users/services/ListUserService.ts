import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { IPaginateUsers } from './../../../interfaces/index';
import AppError from "@shared/errors/AppError";
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    public async execute(): Promise<IPaginateUsers> {
        const user = await this.usersRepository.list();

        if (!user) {
            throw new AppError("User not found");
        }

        return user;
    }
}