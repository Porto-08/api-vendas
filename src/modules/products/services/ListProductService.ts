import { IPaginateProduct } from './../../../interfaces/index';
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../typeorm/repositories/ProductsRepository";
import { RedisCache } from '@shared/cache/RedisCache';
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';
export class ListProductService {
    public async execute(): Promise<IPaginateProduct> {
        const productsRepository = getCustomRepository(ProductsRepository);

        const redisCache = new RedisCache();
        const key = 'api-vendas-PRODUCTS_LIST';

        let products = await redisCache.recover<PaginationAwareObject>(key);

        if (!products) {
            products = await productsRepository.createQueryBuilder().paginate();
            await redisCache.save(key, products);
        }

        if(!products) {
            throw new AppError("Products not found");
        } 

        return products as IPaginateProduct;
    }
}