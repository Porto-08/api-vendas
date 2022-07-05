import { RedisCache } from '@shared/cache/RedisCache';
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import { Product } from "../infra/typeorm/entities/Product";
import { ProductsRepository } from "../infra/typeorm/repositories/ProductsRepository";
import * as Yup from "yup";
interface IRequest {
    name: string;
    price: number;
    quantity: number;
}

export class CreateProductService {
    public async execute({ name, price, quantity }: IRequest): Promise<Product> {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            price: Yup.number().required(),
            quantity: Yup.number().required(),
        });

        if (!(await schema.isValid({ name, price, quantity }))) {
            throw new AppError("Validation error");
        }

        const productsRepository = getCustomRepository(ProductsRepository);

        const productExists = await productsRepository.findByName(name);

        if (productExists) {
            throw new AppError("There is alreay one product with this name.");
        }



        const product = productsRepository.create({
            name,
            price,
            quantity
        });

        // excluindo cache
        const redisCache = new RedisCache();
        await redisCache.invalidate('api-vendas-PRODUCTS_LIST');

        await productsRepository.save(product);

        return product;
    }
}