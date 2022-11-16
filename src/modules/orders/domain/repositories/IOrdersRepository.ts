import { ICreateOrder, IPaginateOrders } from "src/interfaces";
import { IOrder } from "../models/IOrders";

export interface IOrdersRepository {
  findById(id: string): Promise<IOrder | undefined>;
  create({ customer, products }: ICreateOrder): Promise<IOrder>
  list(): Promise<IPaginateOrders>
}