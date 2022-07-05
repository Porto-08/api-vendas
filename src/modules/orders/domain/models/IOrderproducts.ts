import { Product } from './../../../products/infra/typeorm/entities/Product';
import { IOrder } from './IOrders';

export interface IOrderProducts {
  id: string;
  order: IOrder;
  product: Product;
  product_id: string;
  order_id: string;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}