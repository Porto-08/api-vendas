import { Router } from "express";
import { productsRouter } from "@modules/products/routes/products.routes";
import { usersRouter } from "@modules/users/routes/users.routes";
import { sessionsRouter } from "@modules/users/routes/sessions.routes";
import { isAuthenticated } from "@shared/http/middlewares/isAuthenticated";

const routes = Router();

routes.use("/sessions", sessionsRouter);
routes.use("/users", usersRouter);

routes.use("/products", isAuthenticated, productsRouter);

export default routes;