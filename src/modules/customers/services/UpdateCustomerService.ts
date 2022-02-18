import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import * as Yup from "yup";
import { compare, hash } from "bcryptjs";
import { Customer } from "../typeorm/entities/Customer";
import { CustomersRepository } from "../typeorm/repositories/CustomersRepository";

interface IRequest {
    id: string;
    name?: string;
    email?: string;
}

export class UpdateCustomerService {
    public async execute({
        id,
        name,
        email,
    }: IRequest): Promise<Customer | undefined> {
        const schema = Yup.object().shape({
            id: Yup.string().required(),
            name: Yup.string(),
            email: Yup.string().email(),
        });

        if (!(await schema.isValid({ id, name, email }))) {
            throw new AppError("Validation error");
        }

        const customersRepository = getCustomRepository(CustomersRepository);

        const customer = await customersRepository.findById(id);

        if (!customer) {
            throw new AppError("customer not found.");
        }

        if (email && email !== customer.email) {
            const customerWithEmail = await customersRepository.findByEmail(email);

            if (customerWithEmail) {
                throw new AppError("Email already in use.");
            }
        }

        customer.name = name || customer.name;
        customer.email = email || customer.email;

        await customersRepository.save(customer);

        return customer;
    }
}