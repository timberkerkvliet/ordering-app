import { AddProductController } from './controllers/AddProductController';
import { Request, Response } from 'express';

function addProduct(req: Request, res: Response) {
    new AddProductController().handle(req, res)
}

export { addProduct }