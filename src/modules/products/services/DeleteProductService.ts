import AppError from "@shared/errors/AppError";
import { injectable, inject } from 'tsyringe';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { RedisCache } from '@shared/cache/RedisCache';
import * as Yup from "yup";

interface IRequest {
    id: string;
}

@injectable()
export class DeleteProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository
    ) { }


    public async execute({ id }: IRequest): Promise<void> {
        const schema = Yup.object().shape({
            id: Yup.string().required(),
        })

        if (!(await schema.isValid({ id }))) {
            throw new AppError("Validation error");
        }


        const product = await this.productsRepository.findById(id);

        if (!product) {
            throw new AppError("Product not found.");
        }

        const redisCache = new RedisCache();
        await redisCache.invalidate('api-vendas-PRODUCTS_LIST');

        this.productsRepository.remove(product);
    }
}