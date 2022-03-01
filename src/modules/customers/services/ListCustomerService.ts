import AppError from "@shared/errors/AppError";
import { IPaginateCustomer } from './../../../interfaces/index';
import { getCustomRepository } from "typeorm";
import { CustomersRepository } from "../typeorm/repositories/CustomersRepository";

export class ListCustomerService {
    public async execute(): Promise<IPaginateCustomer> {
        const customersRepository = getCustomRepository(CustomersRepository);

        const customers = await customersRepository.createQueryBuilder().paginate();

        if (!customers) {
            throw new AppError("Customer not found");
        }

        return customers as IPaginateCustomer;
    }
}