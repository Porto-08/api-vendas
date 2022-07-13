import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { ICreateCustomer } from './../domain/models/ICreateCustomer';
import { ICustomer } from '../domain/models/ICustomer';
import AppError from "@shared/errors/AppError";
import * as Yup from "yup";
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository
    ) { }

    public async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required().email(),
        });

        if (!(await schema.isValid({ name, email }))) {
            throw new AppError("Validation error");
        }

        const emailExists = await this.customersRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError("There is alreay one customer with this email.");
        }

        const customer = await this.customersRepository.create({
            name,
            email,
        });

        return customer;
    }
}