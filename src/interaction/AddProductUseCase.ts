import { ProductCatalog } from './ProductCatalog';
import { Product } from '../domain/Product';

class AddProductUseCase {
    constructor(private readonly productCatalog: ProductCatalog) {}

    handle(product: Product) {
        const order = this.productCatalog.add(product);
      };
}

export { AddProductUseCase }