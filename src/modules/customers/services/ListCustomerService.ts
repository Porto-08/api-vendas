import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import AppError from "@shared/errors/AppError";
import { IPaginateCustomer } from './../../../interfaces/index';
import { getCustomRepository } from "typeorm";
import { CustomersRepository } from "../infra/typeorm/repositories/CustomersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository
    ) { }

    public async execute(): Promise<IPaginateCustomer> {
        const customers = await this.customersRepository.list();

        if (!customers) {
            throw new AppError("Customers not found");
        }

        return customers as IPaginateCustomer;
    }
}