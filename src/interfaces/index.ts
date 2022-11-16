import { User } from '../modules/users/infra/typeorm/entities/User';
import { Order } from '../modules/orders/infra/typeorm/entities/Orders';
import { Product } from '../modules/products/infra/typeorm/entities/Product';
import { Customer } from "@modules/customers/infra/typeorm/entities/Customer";

export interface IMailContact {
    name: string;
    email: string;
}
export interface ISendMail {
    from?: IMailContact;
    to: IMailContact;
    subject: string;
    templateData: IParseMailTemplate;
}

export interface ITemplateVariable {
    [key: string]: string | number;
}

export interface IParseMailTemplate {
    file: string;
    variables: ITemplateVariable;
}
interface IProduct {
    product_id: string;
    price: number;
    quantity: number;
}
export interface ICreateOrder {
    customer: Customer;
    products: IProduct[];
}

export interface IPaginateCustomer {
    from: number;
    to: number;
    per_page: number;
    total: number;
    current_page: number;
    prev_page: number | null;
    next_page: number | null;
    last_page: number;
    data: Customer[];
}

export interface IPaginateProduct {
    from: number;
    to: number;
    per_page: number;
    total: number;
    current_page: number;
    prev_page: number | null;
    next_page: number | null;
    last_page: number;
    data: Product[];
}

export interface IPaginateOrders {
    from: number;
    to: number;
    per_page: number;
    total: number;
    current_page: number;
    prev_page: number | null;
    next_page: number | null;
    last_page: number;
    data: Order[];
}

export interface IPaginateUsers {
    from: number;
    to: number;
    per_page: number;
    total: number;
    current_page: number;
    prev_page: number | null;
    next_page: number | null;
    last_page: number;
    data: User[];
}

