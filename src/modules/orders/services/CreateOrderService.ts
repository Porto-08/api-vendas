import { ProductsRepository } from './../../products/typeorm/repositories/ProductsRepository';
import { CustomersRepository } from './../../customers/typeorm/repositories/CustomersRepository';
import { Order } from './../typeorm/entities/Orders';
import { OrdersRepository } from './../typeorm/repositories/OrdersRepository';
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import * as Yup from "yup";


interface IProducts {
    id: string;
    quantity: number;
}

interface IRequest {
    customer_id: string;
    products: IProducts[];
}

export class CreateOrderService {
    public async execute({ customer_id, products }: IRequest): Promise<Order> {
        const schema = Yup.object().shape({
            customer: Yup.string().required(),
            products: Yup.array().required(),
        });

        if (!(await schema.isValid({ customer_id, products }))) {
            throw new AppError("Validation error");
        }

        const ordersRepository = getCustomRepository(OrdersRepository);
        const customersRepository = getCustomRepository(CustomersRepository);
        const productsRepository = getCustomRepository(ProductsRepository);

        const customerExists = await customersRepository.findById(customer_id);

        if (!customerExists) {
            throw new AppError("Customer not found.");
        }

        const productsExists = await productsRepository.findAllByIds(products);

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

        const order = await ordersRepository.createOrder({
            customer: customerExists,
            products: serializedProducts,
        });

        const { order_products } = order;

        const updatedProductQuantity = order_products.map(
            product => ({
                id: product.product_id,
                quantity: productsExists.filter(productsExists => productsExists.id === product.product_id)[0].quantity - product.quantity,
            })
        );

        await productsRepository.save(updatedProductQuantity);

        return order;
    }
}