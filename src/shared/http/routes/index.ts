import { Router } from "express";
import { productsRouter } from "@modules/products/routes/products.routes";
import { usersRouter } from "@modules/users/routes/users.routes";
import { sessionsRouter } from "@modules/users/routes/sessions.routes";
import { isAuthenticated } from "@shared/http/middlewares/isAuthenticated";
import { passwordRouter } from "@modules/users/routes/password.routes";
import { customersRouter } from "@modules/customers/routes/customers.routes";
const routes = Router();

routes.use("/sessions", sessionsRouter);
routes.use("/users", usersRouter);
routes.use("/password", passwordRouter);

routes.use("/products", isAuthenticated, productsRouter);
routes.use("/customers", isAuthenticated, customersRouter);

export default routes;