import { OrdersRepository } from './../typeorm/repositories/OrdersRepository';
import { Order } from './../typeorm/entities/Orders';
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";

export class ListOrderService {
    public async execute(): Promise<Order[]> {
        const ordersRepository = getCustomRepository(OrdersRepository);

        const orders = await ordersRepository.find();

        if(!orders) {
            throw new AppError("Orders not found");
        } 

        return orders;
    }
}