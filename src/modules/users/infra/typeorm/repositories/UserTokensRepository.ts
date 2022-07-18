import { IUsersTokenRepository } from "@modules/users/domain/repositories/IUsersTokenRepository";
import { Repository, getRepository } from "typeorm";
import { UserToken } from "../entities/UserToken";

export class UsersTokensRepository implements IUsersTokenRepository {
    private ormRepository: Repository<UserToken>

    constructor() {
        this.ormRepository = getRepository(UserToken);
    }

    public async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = await this.ormRepository.findOne({ where: { token } });

        return userToken;
    }

    public async generate(user_id: string): Promise<UserToken> {
        const userToken = await this.ormRepository.create({ user_id });

        await this.ormRepository.save(userToken);

        return userToken;
    }
}