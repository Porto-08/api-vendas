import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { IPaginateProduct } from './../../../interfaces/index';
import AppError from "@shared/errors/AppError";
import { RedisCache } from '@shared/cache/RedisCache';
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';
import { inject, injectable } from 'tsyringe';


@injectable()
export class ListProductService {

    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository
    ) { }


    public async execute(): Promise<IPaginateProduct> {
        const redisCache = new RedisCache();
        const key = 'api-vendas-PRODUCTS_LIST';

        let products = await redisCache.recover<IPaginateProduct>(key);

        if (!products) {
            products = await this.productsRepository.list();
            await redisCache.save(key, products);
        }

        if (!products) {
            throw new AppError("Products not found");
        }

        return products;
    }
}