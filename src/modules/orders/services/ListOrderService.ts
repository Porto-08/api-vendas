import { IPaginateOrders } from './../../../interfaces/index';
import { OrdersRepository } from './../typeorm/repositories/OrdersRepository';
import { Order } from './../typeorm/entities/Orders';
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";

export class ListOrderService {
    public async execute(): Promise<IPaginateOrders> {
        const ordersRepository = getCustomRepository(OrdersRepository);

        const orders = await ordersRepository.createQueryBuilder().paginate();

        if(!orders) {
            throw new AppError("Orders not found");
        } 

        return orders as IPaginateOrders;
    }
}