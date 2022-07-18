import { IUpdateQuantity } from './../models/IUpdateQuantity';
import { IPaginateProduct } from "src/interfaces";
import { IProduct } from "../models/IProduct"
import { ICreateProduct } from "../models/ICreateProduct"
import { IProducts } from "@modules/orders/services/CreateOrderService";

export interface IProductsRepository {
  findById(id: string): Promise<IProduct | undefined>
  findAllByIds(products: IProducts[]): Promise<IProduct[]>
  findByName(name: string): Promise<IProduct | undefined>
  create(data: ICreateProduct): Promise<IProduct>;
  save(customer: IProduct | IUpdateQuantity[]): Promise<IProduct>;
  remove(customer: IProduct): void;
  list(): Promise<IPaginateProduct>;
}