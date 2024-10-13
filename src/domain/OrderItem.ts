import { Product } from "./Product";
import bigDecimal from "js-big-decimal";

export type OrderItem = {
    product: Product;
    quantity: number;
    taxedAmount: bigDecimal;
    tax: bigDecimal;
}
