import { ICreateOrder } from "src/interfaces";
import { Repository, EntityRepository } from "typeorm";
import { Order } from "../entities/Orders";

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {

    public async findById(id: string): Promise<Order | undefined> {
        const order = await this.findOne(id, {
            relations: ["customer", "order_products"]
        });

        return order;
    }

    public async createOrder({ customer, products }: ICreateOrder): Promise<Order> {
        const order = this.create({
            customer,
            order_products: products,
        });
        
        await this.save(order);

        return order;
    }
}