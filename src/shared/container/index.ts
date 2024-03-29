import { container } from "tsyringe"

import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersRepository"
import { CustomersRepository } from "@modules/customers/infra/typeorm/repositories/CustomersRepository"
import { IProductsRepository } from "@modules/products/domain/repositories/IProductsRepository";
import { ProductsRepository } from "@modules/products/infra/typeorm/repositories/ProductsRepository";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import { UsersRepository } from "@modules/users/infra/typeorm/repositories/UsersRepository";
import { IUsersTokenRepository } from "@modules/users/domain/repositories/IUsersTokenRepository";
import { UsersTokensRepository } from "@modules/users/infra/typeorm/repositories/UserTokensRepository";
import { IOrdersRepository } from "@modules/orders/domain/repositories/IOrdersRepository";
import { OrdersRepository } from "@modules/orders/infra/typeorm/repositories/OrdersRepository";

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IUsersTokenRepository>(
  'UsersTokensRepository',
  UsersTokensRepository
)

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository
);

