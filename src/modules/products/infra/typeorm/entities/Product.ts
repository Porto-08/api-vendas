import { OrderProducts } from "../../../../orders/infra/typeorm/entities/OrderProducts";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, } from "typeorm"
import { IProduct } from "@modules/products/domain/models/IProduct";

@Entity('products')

export class Product implements IProduct {

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