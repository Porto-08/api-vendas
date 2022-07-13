import { IPaginateCustomer } from 'src/interfaces';
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';
import { ICreateCustomer } from '../models/ICreateCustomer';
import { ICustomer } from "../models/ICustomer";

export interface ICustomersRepository {
  findByName(name: string): Promise<ICustomer | undefined>
  findById(id: string): Promise<ICustomer | undefined>
  findByEmail(email: string): Promise<ICustomer | undefined>
  create(data: ICreateCustomer): Promise<ICustomer>;
  save(customer: ICustomer): Promise<ICustomer>;
  remove(customer: ICustomer): void;
  list(): Promise<IPaginateCustomer>;
}