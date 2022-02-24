import { OrdersController } from './../controllers/OrdersController';
import { Router } from "express";

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.get("/", ordersController.index);
ordersRouter.get("/:id", ordersController.show);
ordersRouter.post("/", ordersController.create);

export { ordersRouter };