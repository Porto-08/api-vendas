import AppError from "@shared/errors/AppError";
import { ICreateCustomer } from './../domain/models/ICreateCustomer';
import { getCustomRepository } from "typeorm"
import { Customer } from "../infra/typeorm/entities/Customer";
import { CustomersRepository } from "../infra/typeorm/repositories/CustomersRepository";
import * as Yup from "yup";

export class CreateCustomerService {
    public async execute({ name, email }: ICreateCustomer): Promise<Customer> {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required().email(),
        });

        if (!(await schema.isValid({ name, email }))) {
            throw new AppError("Validation error");
        }

        const customersRepository = getCustomRepository(CustomersRepository);

        const emailExists = await customersRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError("There is alreay one customer with this email.");
        }

        const customer = customersRepository.create({
            name,
            email,
        });

        await customersRepository.save(customer);

        return customer;
    }
}