import { Order } from './../modules/orders/typeorm/entities/Orders';
import { Product } from './../modules/products/typeorm/entities/Product';
import { Customer } from "@modules/customers/typeorm/entities/Customer";

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
