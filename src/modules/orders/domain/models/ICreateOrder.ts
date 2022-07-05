import { IProducts } from './../../services/CreateOrderService';

export interface ICreateOrder {
  customer_id: string;
  products: IProducts[];
}
