import bigDecimal from "js-big-decimal";
import { Money } from "./Money";

type ProductName = string;

type Product = {
    name: ProductName
    price: Money
    taxPercentage: bigDecimal
}

export { Product, ProductName}