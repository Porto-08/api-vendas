import { IPaginateUsers } from './../../../interfaces/index';
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { User } from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";

export class ListUserService {
    public async execute(): Promise<IPaginateUsers> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.createQueryBuilder().paginate();

        if(!user) {
            throw new AppError("User not found");
        } 

        user.data.forEach((user: User) =>  {
            delete user.password;
        });

        
        return user as IPaginateUsers;
    }
}