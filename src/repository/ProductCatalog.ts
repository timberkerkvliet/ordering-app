import { Product } from "../domain/Product";

export class ProductCatalog {
    private static products: Map<string, Product> = new Map();

    clear(): void {
        ProductCatalog.products = new Map();
    }

    add(product: Product): void {
        ProductCatalog.products.set(product.name, product);
    }

    getByName(name: string): Product | undefined {

        console.log(ProductCatalog.products)
        return ProductCatalog.products.get(name);
    }
}