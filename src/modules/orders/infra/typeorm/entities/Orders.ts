import { IOrder } from './../../../domain/models/IOrders';
import { Customer } from "../../../../customers/infra/typeorm/entities/Customer";
import { CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderProducts } from "./OrderProducts";

@Entity('orders')
export class Order implements IOrder {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Customer)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @OneToMany(() => OrderProducts, order_product => order_product.order, {
        cascade: true
    })
    orders_products: OrderProducts[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}