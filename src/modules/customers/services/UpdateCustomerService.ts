import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import * as Yup from "yup";
import { compare, hash } from "bcryptjs";
import { Customer } from "../infra/typeorm/entities/Customer";
import { CustomersRepository } from "../infra/typeorm/repositories/CustomersRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    id: string;
    name?: string;
    email?: string;
}

@injectable()
export class UpdateCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository
    ) { }

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

        const customer = await this.customersRepository.findById(id);

        if (!customer) {
            throw new AppError("customer not found.");
        }

        if (email && email !== customer.email) {
            const customerWithEmail = await this.customersRepository.findByEmail(email);

            if (customerWithEmail) {
                throw new AppError("Email already in use.");
            }
        }

        customer.name = name || customer.name;
        customer.email = email || customer.email;

        await this.customersRepository.save(customer);

        return customer;
    }
}