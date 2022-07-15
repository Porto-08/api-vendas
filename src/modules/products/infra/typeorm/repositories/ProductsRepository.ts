import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IProduct } from '@modules/products/domain/models/IProduct';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { IPaginateProduct } from 'src/interfaces';
import { Repository, In, getRepository } from "typeorm";
import { Product } from "../entities/Product";

interface IFindProducts {
    id: string;
}

export class ProductsRepository implements IProductsRepository {
    private ormRepository: Repository<Product>;

    constructor() {
        this.ormRepository = getRepository(Product);
    }

    public async findById(id: string): Promise<IProduct | undefined> {
        const product = await this.ormRepository.findOne(id);

        return product;
    }

    public async create(data: ICreateProduct): Promise<IProduct> {
        const product = this.ormRepository.create(data);

        await this.ormRepository.save(product);

        return product;
    }

    public async save(product: IProduct): Promise<IProduct> {
        await this.ormRepository.save(product);

        return product;
    }

    public async remove(product: IProduct): Promise<void> {
        await this.ormRepository.delete(product);
    }

    public async list(): Promise<IPaginateProduct> {
        const products = await this.ormRepository.createQueryBuilder().paginate() as IPaginateProduct;

        return products
    }

    public async findByName(name: string): Promise<Product | undefined> {
        const product = await this.ormRepository.findOne({ where: { name } });

        return product;
    }

    public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
        const productIds = products.map(product => product.id);

        const productsFound = await this.ormRepository.find({
            where: {
                id: In(productIds)
            }
        });

        return productsFound;
    }
}