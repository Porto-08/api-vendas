import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../typeorm/repositories/ProductsRepository";
import * as Yup from "yup";

interface IRequest {
    id: string;
}

export class DeleteProductService {
    public async execute({ id }: IRequest): Promise<void> {
        const schema = Yup.object().shape({
            id: Yup.string().required(),
        })

        if (!(await schema.isValid({ id }))) {
            throw new AppError("Validation error");
        }

        const productsRepository = getCustomRepository(ProductsRepository);

        const product = await productsRepository.findOne(id);

        if (!product) {
            throw new AppError("Product not found.");
        }

        await productsRepository.remove(product);
    }
}