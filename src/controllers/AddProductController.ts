import { Request, Response } from 'express';
import { ProductCatalog } from '../repository/ProductCatalog';
import bigDecimal from 'js-big-decimal';

class AddProductController {
    private productCatalog: ProductCatalog;

    constructor() {
      this.productCatalog = new ProductCatalog();
    }

    handle(req: Request, res: Response) {
        const order = this.productCatalog.add({
          name: req.body.name,
          category: {
            name: "GOODS",
            taxPercentage: new bigDecimal(req.body.taxPercentage),
          },
          price: new bigDecimal(req.body.price)
        });
    
        return res.status(200).json({ message: 'Product added successfully'});
      
      };
}

export { AddProductController }