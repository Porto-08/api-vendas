import { RedisCache } from '@shared/cache/RedisCache';
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import { Product } from "../infra/typeorm/entities/Product";
import { ProductsRepository } from "../infra/typeorm/repositories/ProductsRepository";
import * as Yup from "yup";

interface IRequest {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export class UpdateProductService {
    public async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
        const schema = Yup.object().shape({
            name: Yup.string(),
            price: Yup.number(),
            quantity: Yup.number(),
        });

        if (!(await schema.isValid({ name, price, quantity }))) {
            throw new AppError("Validation error");
        }

        const productsRepository = getCustomRepository(ProductsRepository);

        const product = await productsRepository.findOne(id);

        if (!product) {
            throw new AppError("Product not found.");
        }

        const productExists = await productsRepository.findByName(name);

        if (productExists && name !== product.name) {
            throw new AppError("There is alreay one product with this name.");
        }

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        // excluindo cache
        const redisCache = new RedisCache();
        await redisCache.invalidate('api-vendas-PRODUCTS_LIST');

        await productsRepository.save(product);

        return product;
    }
}