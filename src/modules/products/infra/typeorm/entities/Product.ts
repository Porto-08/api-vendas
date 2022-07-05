import { OrderProducts } from "../../../../orders/infra/typeorm/entities/OrderProducts";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, } from "typeorm"

@Entity('products')

export class Product {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column("decimal")
    price: number;

    @Column("int")
    quantity: number;

    @OneToMany(() => OrderProducts, order_product => order_product.order)
    orders_products: OrderProducts[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}