import { IUserToken } from './../models/IUserToken';


export interface IUsersTokenRepository {
  findByToken(token: string): Promise<IUserToken | undefined>;
  generate(user_id: string): Promise<IUserToken>;
}