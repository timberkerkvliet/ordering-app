import { Request, Response } from 'express';
import { ProductCatalog } from '../repository/ProductCatalog';
import bigDecimal from 'js-big-decimal';
import { AddProductUseCase } from '../interaction/AddProductUseCase';

class AddProductController {
    constructor(private readonly addProductUseCase: AddProductUseCase) {
    }

    handle(req: Request, res: Response) {
        this.addProductUseCase.handle(req.body.name, req.body.taxPercentage, req.body.price);
    
        return res.status(200).json({ message: 'Product added successfully'});
      
      };
}

export { AddProductController }