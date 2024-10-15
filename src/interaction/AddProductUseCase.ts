import { Request, Response } from 'express';
import { ProductCatalogInMemory } from '../adapters/ProductCatalogInMemory';
import bigDecimal from 'js-big-decimal';

class AddProductUseCase {
    private productCatalog: ProductCatalogInMemory;

    constructor() {
      this.productCatalog = new ProductCatalogInMemory();
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