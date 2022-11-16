import { Router } from "express";
import { productsRouter } from "@modules/products/infra/http/routes/products.routes";
import { usersRouter } from "@modules/users/infra/http/routes/users.routes";
import { sessionsRouter } from "@modules/users/infra/http/routes/sessions.routes";
import { isAuthenticated } from "@shared/infra/http/middlewares/isAuthenticated";
import { passwordRouter } from "@modules/users/infra/http/routes/password.routes";
import { customersRouter } from "@modules/customers/infra/http/routes/customers.routes";
import { ordersRouter } from "@modules/orders/infra/http/routes/orders.routes";

const routes = Router();

routes.use("/sessions", sessionsRouter);
routes.use("/users", usersRouter);
routes.use("/password", passwordRouter);

routes.use("/products", isAuthenticated, productsRouter);
routes.use("/customers", isAuthenticated, customersRouter);
routes.use("/orders", isAuthenticated, ordersRouter);

export default routes;