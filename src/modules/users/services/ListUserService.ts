import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { User } from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";

export class ListUserService {
    public async execute(): Promise<User[]> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.find();

        if(!user) {
            throw new AppError("User not found");
        } 

        return user;
    }
}