import { IOrderProducts } from "@modules/orders/domain/models/IOrderproducts";

export interface IProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  orders_products: IOrderProducts[];
  created_at: Date;
  updated_at: Date;
}