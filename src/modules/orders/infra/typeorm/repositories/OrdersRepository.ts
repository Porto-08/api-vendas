import { IOrdersRepository } from "@modules/orders/domain/repositories/IOrdersRepository";
import { ICreateOrder, IPaginateOrders } from "src/interfaces";
import { Repository, EntityRepository, getRepository } from "typeorm";
import { Order } from "../entities/Orders";

@EntityRepository(Order)
export class OrdersRepository implements IOrdersRepository {

    private ormRepository: Repository<Order>

    constructor() {
        this.ormRepository = getRepository(Order);
    }

    public async list(): Promise<IPaginateOrders> {
        const orders = await this.ormRepository.createQueryBuilder().paginate() as IPaginateOrders;

        return orders
    }


    public async findById(id: string): Promise<Order | undefined> {
        const order = await this.ormRepository.findOne(id, {
            relations: ["customer", "orders_products"]
        });

        return order;
    }

    public async create({ customer, products }: ICreateOrder): Promise<Order> {
        const order = this.ormRepository.create({
            customer,
            orders_products: products,
        });

        await this.ormRepository.save(order);

        return order;
    }
}