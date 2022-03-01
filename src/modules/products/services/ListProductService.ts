import { IPaginateProduct } from './../../../interfaces/index';
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../typeorm/repositories/ProductsRepository";

export class ListProductService {
    public async execute(): Promise<IPaginateProduct> {
        const productsRepository = getCustomRepository(ProductsRepository);

        const products = await productsRepository.createQueryBuilder().paginate();

        if(!products) {
            throw new AppError("Products not found");
        } 

        return products as IPaginateProduct;
    }
}