import { Request, Response } from 'express';
import { ProductCatalog } from '../repository/ProductCatalog';
import bigDecimal from 'js-big-decimal';

class AddProductUseCase {
    private productCatalog: ProductCatalog;

    constructor() {
      this.productCatalog = new ProductCatalog();
    }

    handle(name: string, taxPercentage: number, price: number) {
        const order = this.productCatalog.add({
          name: name,
          taxPercentage: new bigDecimal(taxPercentage),
          price: new bigDecimal(price)
        });
      };
}

export { AddProductUseCase }