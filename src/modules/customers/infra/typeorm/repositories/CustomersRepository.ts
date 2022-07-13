import { ICreateCustomer } from './../../../domain/models/ICreateCustomer';
import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersRepository";
import { getRepository, Repository } from "typeorm";
import { Customer } from "../entities/Customer";
import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { IPaginateCustomer } from 'src/interfaces';

export class CustomersRepository implements ICustomersRepository {
    private ormRepository: Repository<Customer>;

    constructor() {
        this.ormRepository = getRepository(Customer);
    }

    public async create({ name, email }: ICreateCustomer): Promise<ICustomer> {
        const customer = this.ormRepository.create({ name, email });

        await this.ormRepository.save(customer);

        return customer;
    }

    public async list(): Promise<IPaginateCustomer> {
        const customers = await this.ormRepository.createQueryBuilder().paginate() as IPaginateCustomer;

        return customers
    }

    public async save(customer: ICustomer): Promise<ICustomer> {
        await this.ormRepository.save(customer);

        return customer;
    }

    public async remove(customer: ICustomer): Promise<void> {
        await this.ormRepository.remove(customer);
    }


    public async findByName(name: string): Promise<ICustomer | undefined> {
        const customer = await this.ormRepository.findOne({ where: { name } });

        return customer;
    }

    public async findById(id: string): Promise<ICustomer | undefined> {
        const customer = await this.ormRepository.findOne({ where: { id } });

        return customer;
    }

    public async findByEmail(email: string): Promise<ICustomer | undefined> {
        const customer = await this.ormRepository.findOne({ where: { email } });

        return customer;
    }
}