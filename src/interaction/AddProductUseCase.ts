import { Request, Response } from 'express';
import { ProductCatalog } from './ProductCatalog';
import bigDecimal from 'js-big-decimal';

class AddProductUseCase {
    constructor(private readonly productCatalog: ProductCatalog) {
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