import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';
import { Order } from '../infra/typeorm/entities/Orders';
import AppError from "@shared/errors/AppError";
import * as Yup from "yup";
import { inject, injectable } from 'tsyringe';

interface IRequest {
    id: string;
}

@injectable()
export class ShowOrderService {
    constructor(
        @inject('OrdersRepository')
        private ordersRepository: IOrdersRepository,
    ) { }

    public async execute({ id }: IRequest): Promise<Order | undefined> {
        const schema = Yup.object().shape({
            id: Yup.string().required(),
        })

        if (!(await schema.isValid({ id }))) {
            throw new AppError("Validation error");
        }

        const order = await this.ordersRepository.findById(id);

        if (!order) {
            throw new AppError("Order not found.");
        }

        return order;
    }
}