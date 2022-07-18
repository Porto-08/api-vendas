import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { RedisCache } from '@shared/cache/RedisCache';
import AppError from "@shared/errors/AppError";
import { Product } from "../infra/typeorm/entities/Product";
import * as Yup from "yup";
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';

@injectable()
export class CreateProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository
    ) { }


    public async execute({ name, price, quantity }: ICreateProduct): Promise<Product> {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            price: Yup.number().required(),
            quantity: Yup.number().required(),
        });

        if (!(await schema.isValid({ name, price, quantity }))) {
            throw new AppError("Validation error");
        }

        const productExists = await this.productsRepository.findByName(name);

        if (productExists) {
            throw new AppError("There is alreay one product with this name.");
        }

        const product = this.productsRepository.create({
            name,
            price,
            quantity
        });

        const redisCache = new RedisCache();
        await redisCache.invalidate('api-vendas-PRODUCTS_LIST');

        return product;
    }
}