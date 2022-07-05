import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import * as Yup from "yup";
import { CustomersRepository } from "../infra/typeorm/repositories/CustomersRepository";

interface IRequest {
    id: string;
}

export class DeleteCustomerService {
    public async execute({ id }: IRequest): Promise<void> {
        const schema = Yup.object().shape({
            id: Yup.string().required(),
        })

        if (!(await schema.isValid({ id }))) {
            throw new AppError("Validation error");
        }

        const customersRepository = getCustomRepository(CustomersRepository);

        const customer = await customersRepository.findOne(id);

        if (!customer) {
            throw new AppError("Customer not found.");
        }

        await customersRepository.remove(customer);
    }
}