import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import * as Yup from "yup";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import { CustomersRepository } from "../infra/typeorm/repositories/CustomersRepository";

interface IRequest {
    id: string;
}

@injectable()
export class DeleteCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository
    ) { }

    public async execute({ id }: IRequest): Promise<void> {
        const schema = Yup.object().shape({
            id: Yup.string().required(),
        })

        if (!(await schema.isValid({ id }))) {
            throw new AppError("Validation error");
        }

        const customer = await this.customersRepository.findById(id);

        if (!customer) {
            throw new AppError("Customer not found.");
        }

        this.customersRepository.remove(customer);
    }
}