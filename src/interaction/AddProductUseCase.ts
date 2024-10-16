import { ProductCatalog } from './ProductCatalog';
import bigDecimal from 'js-big-decimal';
import { Money } from '../domain/Money';

class AddProductUseCase {
    constructor(private readonly productCatalog: ProductCatalog) {
    }

    handle(name: string, taxPercentage: number, price: string) {
        const order = this.productCatalog.add({
          name: name,
          taxPercentage: new bigDecimal(taxPercentage),
          price: Money.fromString(price, "EUR")
        });
      };
}

export { AddProductUseCase }