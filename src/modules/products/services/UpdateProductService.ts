import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { RedisCache } from '@shared/cache/RedisCache';
import AppError from "@shared/errors/AppError";
import { Product } from "../infra/typeorm/entities/Product";
import * as Yup from "yup";
import { inject, injectable } from 'tsyringe';

interface IRequest {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

@injectable()
export class UpdateProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository
    ) { }

    public async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
        const schema = Yup.object().shape({
            name: Yup.string(),
            price: Yup.number(),
            quantity: Yup.number(),
        });

        if (!(await schema.isValid({ name, price, quantity }))) {
            throw new AppError("Validation error");
        }

        const product = await this.productsRepository.findById(id);

        if (!product) {
            throw new AppError("Product not found.");
        }

        const productExists = await this.productsRepository.findByName(name);

        if (productExists && name !== product.name) {
            throw new AppError("There is alreay one product with this name.");
        }

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        // excluindo cache
        const redisCache = new RedisCache();
        await redisCache.invalidate('api-vendas-PRODUCTS_LIST');

        await this.productsRepository.save(product);

        return product;
    }
}