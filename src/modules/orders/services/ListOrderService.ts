import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';
import { IPaginateOrders } from './../../../interfaces/index';
import AppError from "@shared/errors/AppError";
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListOrderService {
    constructor(
        @inject('OrdersRepository')
        private ordersRepository: IOrdersRepository,
    ) { }


    public async execute(): Promise<IPaginateOrders> {
        const orders = await this.ordersRepository.list();

        if (!orders) {
            throw new AppError("Orders not found");
        }

        return orders
    }
}