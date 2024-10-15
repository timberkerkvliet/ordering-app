import { Product } from "../domain/Product";

export interface ProductCatalog {
    clear(): void;
    add(product: Product): void;
    getByName(name: string): Product | undefined;
}