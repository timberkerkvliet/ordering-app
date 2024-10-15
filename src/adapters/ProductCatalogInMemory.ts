import { Product } from "../domain/Product";

export class ProductCatalogInMemory {
    private static products: Map<string, Product> = new Map();

    clear(): void {
        ProductCatalogInMemory.products = new Map();
    }

    add(product: Product): void {
        ProductCatalogInMemory.products.set(product.name, product);
    }

    getByName(name: string): Product | undefined {

        console.log(ProductCatalogInMemory.products)
        return ProductCatalogInMemory.products.get(name);
    }
}