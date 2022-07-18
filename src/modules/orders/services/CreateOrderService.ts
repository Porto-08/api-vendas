
import { Order } from '../infra/typeorm/entities/Orders';
import AppError from "@shared/errors/AppError";
import * as Yup from "yup";
import { ICreateOrder } from '../domain/models/ICreateOrder';
import { inject, injectable } from 'tsyringe';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';


export interface IProducts {
    id: string;
    quantity: number;
}
@injectable()
export class CreateOrderService {
    constructor(
        @inject('OrdersRepository')
        private ordersRepository: IOrdersRepository,

        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,

        @inject('ProductsRepository')
        private productsRepository: IProductsRepository
    ) { }


    public async execute({ customer_id, products }: ICreateOrder): Promise<Order> {
        const schema = Yup.object().shape({
            customer_id: Yup.string().required(),
            products: Yup.array().of(
                Yup.object().shape({
                    id: Yup.string().required(),
                    quantity: Yup.number().required(),
                })
            ),
        });

        if (!(await schema.isValid({ customer_id, products }))) {
            throw new AppError("Validation error");
        }

        const customerExists = await this.customersRepository.findById(customer_id);

        if (!customerExists) {
            throw new AppError("Customer not found.");
        }

        const productsExists = await this.productsRepository.findAllByIds(products);

        const productsExistsIds = productsExists.map(product => product.id);

        const productsNotExists = products.filter(product => !productsExistsIds.includes(product.id));

        if (productsNotExists.length) {
            throw new AppError(`Products not found: ${productsNotExists.map(product => product.id).join(', ')}`);
        }

        const quantityAvailable = products.filter(
            product => productsExists.filter(
                productExists => productExists.id === product.id
            )[0].quantity < product.quantity
        );

        if (quantityAvailable.length) {
            throw new AppError(`Product ${quantityAvailable[0].id} has only ${quantityAvailable[0].quantity} available.`);
        }

        const serializedProducts = products.map(product => ({
            product_id: product.id,
            quantity: product.quantity,
            price: productsExists.filter(product => product.id === product.id)[0].price,
        }));

        const order = await this.ordersRepository.create({
            customer: customerExists,
            products: serializedProducts,
        });

        const { orders_products } = order;

        const updatedProductQuantity = orders_products.map(
            product => ({
                id: product.product_id,
                quantity: productsExists.filter(productsExists => productsExists.id === product.product_id)[0].quantity - product.quantity,
            })
        );

        await this.productsRepository.save(updatedProductQuantity);

        return order;
    }
}