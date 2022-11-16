import { IPaginateUsers } from "src/interfaces";
import { IUser } from "../models/IUser"
import { ICreateUser } from "../models/ICreateUser"


export interface IUsersRepository {
  findById(id: string): Promise<IUser | undefined>
  findByName(name: string): Promise<IUser | undefined>
  findByEmail(name: string): Promise<IUser | undefined>
  create(data: ICreateUser): Promise<IUser>;
  save(user: IUser): Promise<IUser>;
  remove(user: IUser): Promise<void>;
  list(): Promise<IPaginateUsers>;
}