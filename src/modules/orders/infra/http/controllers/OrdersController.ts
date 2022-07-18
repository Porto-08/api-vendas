import { container } from 'tsyringe';
import { ListOrderService } from '../../../services/ListOrderService';
import { CreateOrderService } from '../../../services/CreateOrderService';
import { ShowOrderService } from '../../../services/ShowOrderService';
import { Request, Response } from "express";
export class OrdersController {

    public async index(req: Request, res: Response): Promise<Response> {
        const listOrderService = container.resolve(ListOrderService);

        const orders = await listOrderService.execute();

        return res.json(orders);
    }


    public async show(req: Request, res: Response): Promise<Response> {

        const { id } = req.params;

        const showOrderService = container.resolve(ShowOrderService);

        const order = await showOrderService.execute({ id });

        return res.json(order);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const { customer_id, products } = req.body;

        const createOrderService = container.resolve(CreateOrderService);

        const order = await createOrderService.execute({
            customer_id,
            products,
        });

        return res.json(order);
    }
}