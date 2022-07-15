import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import AppError from "@shared/errors/AppError";
import { Product } from "../infra/typeorm/entities/Product";
import * as Yup from "yup";
import { inject, injectable } from "tsyringe";

interface IRequest {
    id: string;
}

@injectable()
export class ShowProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository
    ) { }

    public async execute({ id }: IRequest): Promise<Product | undefined> {
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

        return product;
    }
}