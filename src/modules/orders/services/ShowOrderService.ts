import { OrdersRepository } from '../infra/typeorm/repositories/OrdersRepository';
import { Order } from '../infra/typeorm/entities/Orders';
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import * as Yup from "yup";

interface IRequest {
    id: string;
}

export class ShowOrderService {
    public async execute({ id }: IRequest): Promise<Order | undefined> {
        const schema = Yup.object().shape({
            id: Yup.string().required(),
        })

        if (!(await schema.isValid({ id }))) {
            throw new AppError("Validation error");
        }

        const ordersRepository = getCustomRepository(OrdersRepository);

        const order = await ordersRepository.findById(id);

        if (!order) {
            throw new AppError("Order not found.");
        }

        return order;
    }
}