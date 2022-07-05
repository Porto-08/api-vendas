import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import * as Yup from "yup";
import { Customer } from "../infra/typeorm/entities/Customer";
import { CustomersRepository } from "../infra/typeorm/repositories/CustomersRepository";

interface IRequest {
    id: string;
}

export class ShowCustomerService {
    public async execute({ id }: IRequest): Promise<Customer | undefined> {
        const schema = Yup.object().shape({
            id: Yup.string().required(),
        })

        if (!(await schema.isValid({ id }))) {
            throw new AppError("Validation error");
        }

        const customersRepository = getCustomRepository(CustomersRepository);

        const customer = await customersRepository.findById(id);

        if (!customer) {
            throw new AppError("Customer not found.");
        }

        return customer;
    }
}