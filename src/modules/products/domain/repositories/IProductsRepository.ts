import { IPaginateProduct } from "src/interfaces";
import { ICreateProduct } from "../models/ICreateProduct";
import { IProduct } from "../models/IProduct";

export interface IProductsRepository {
  findById(id: string): Promise<IProduct | undefined>
  findByName(name: string): Promise<IProduct | undefined>
  create(data: ICreateProduct): Promise<IProduct>;
  save(customer: IProduct): Promise<IProduct>;
  remove(customer: IProduct): void;
  list(): Promise<IPaginateProduct>;
}