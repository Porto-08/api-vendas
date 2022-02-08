import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { Product } from "../typeorm/entities/Product";
import { ProductsRepository } from "../typeorm/repositories/ProductsRepository";

export class ListProductService {
    public async execute(): Promise<Product[]> {
        const productsRepository = getCustomRepository(ProductsRepository);

        const products = await productsRepository.find();

        if(!products) {
            throw new AppError("Products not found");
        } 

        return products;
    }
}