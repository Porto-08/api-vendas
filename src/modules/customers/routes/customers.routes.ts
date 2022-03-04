import { Router } from "express";
import { CustomerController } from "../controllers/CustomersController";

const customersRouter = Router();
const customerController = new CustomerController();

customersRouter.post("/", customerController.create);
customersRouter.get("/", customerController.index);
customersRouter.get("/:id", customerController.show);
customersRouter.put("/:id", customerController.update);
customersRouter.delete("/:id", customerController.delete);

export { customersRouter };