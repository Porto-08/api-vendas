import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "../../../products/typeorm/entities/Product";
import { Order } from "./Orders";

@Entity('orders_products')
export class OrderProducts {
    @PrimaryGeneratedColumn('uuid')
  id: string;
 
  @ManyToOne(() => Order, order => order.orders_products)
  @JoinColumn({ name: 'order_id' })
  order: Order;
 
  @ManyToOne(() => Product, product => product.orders_products)
  @JoinColumn({ name: 'product_id' })
  product: Product;
 
  // @Column('decimal')
  @Column()
  product_id: string;
 
  // @Column('decimal')
  @Column()
  order_id: string;
 
  // @Column('decimal')
  // customer: number;
 
  @Column('decimal')
  price: number;
 
  @Column('int')
  quantity: number;
 
  @CreateDateColumn()
  created_at: Date;
 
  @UpdateDateColumn()
  updated_at: Date;
}