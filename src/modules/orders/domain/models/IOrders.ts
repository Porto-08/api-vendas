import { OrderProducts } from './../../infra/typeorm/entities/OrderProducts';
import { ICustomer } from "@modules/customers/domain/models/ICustomer";

export interface IOrder {
  id: string;
  customer: ICustomer;
  orders_products: OrderProducts[];
  created_at: Date;
  updated_at: Date;
}