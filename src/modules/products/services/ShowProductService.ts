import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { Product } from "../typeorm/entities/Product";
import { ProductsRepository } from "../typeorm/repositories/ProductsRepository";
import * as Yup from "yup";

interface IRequest {
    id: string;
}

export class ShowProductService {
    public async execute({ id }: IRequest): Promise<Product | undefined> {
        const schema = Yup.object().shape({
            id: Yup.string().required(),
        })

        if (!(await schema.isValid({ id }))) {
            throw new AppError("Validation error");
        }

        const productsRepository = getCustomRepository(ProductsRepository);

        const product = await productsRepository.findOne(id);

        if(!product) {
            throw new AppError("Product not found.");
        }

        return product;
    }
}