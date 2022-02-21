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

export interface ICreateOrder {
    customer: Customer;
    products: [{
        product_id: string;
        quantity: number;
        price: number;
    }];
}
