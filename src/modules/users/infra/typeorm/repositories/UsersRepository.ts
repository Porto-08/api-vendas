import { ICreateUser } from "@modules/users/domain/models/ICreateUser";
import { IUser } from "@modules/users/domain/models/IUser";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import { IPaginateUsers } from "src/interfaces";
import { Repository, getRepository } from "typeorm";
import { User } from "../entities/User";


export class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async create(data: ICreateUser): Promise<IUser> {
        const user = this.ormRepository.create(data);

        await this.ormRepository.save(user);

        return user;
    }

    public async save(user: IUser): Promise<IUser> {
        const userSaved = await this.ormRepository.save(user)

        return userSaved;
    }

    public async remove(user: IUser): Promise<void> {
        await this.ormRepository.remove(user);
    }

    public async list(): Promise<IPaginateUsers> {
        const users = await this.ormRepository.createQueryBuilder().paginate() as IPaginateUsers;

        return users;
    }

    public async findByName(name: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({ where: { name } });

        return user;
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({ where: { id } });

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({ where: { email } });

        return user;
    }
}