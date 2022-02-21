import { Customer } from "@modules/customers/typeorm/entities/Customer";
import { CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderProducts } from "./OrderProducts";

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Customer, user => user.id)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @OneToMany(() => OrderProducts, order_product => order_product.order, { 
        cascade: true 
    })
    order_products: OrderProducts[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}