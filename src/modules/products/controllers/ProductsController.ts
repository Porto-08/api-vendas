import { Request, Response } from "express";
import { CreateProductService } from "../services/CreateProductService";
import { DeleteProductService } from "../services/DeleteProductService";
import { ListProductService } from "../services/ListProductService";
import { ShowProductService } from "../services/ShowProductService";
import { UpdateProductService } from "../services/UpdateProductService";

export class ProductsController {
    public async index(req: Request, res: Response): Promise<Response> {
        const listProductService = new ListProductService();

        const products = await listProductService.execute();

        return res.json(products);
    }

    public async show(req: Request, res: Response): Promise<Response> {

        const { id } = req.params;

        const showProductService = new ShowProductService();

        const product = await showProductService.execute({ id });

        return res.json(product);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const { name, price, quantity } = req.body;
        const createProductService = new CreateProductService();

        const product = await createProductService.execute({
            name,
            price,
            quantity
        });

        return res.json(product);
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const { name, price, quantity } = req.body;
        const { id } = req.params;

        const updateProductService = new UpdateProductService();

        const product = await updateProductService.execute({
            id,
            name,
            price,
            quantity
        });

        return res.json(product);
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const deleteProductService = new DeleteProductService();

        await deleteProductService.execute({ id })

        return res.status(204).send();
    }
}