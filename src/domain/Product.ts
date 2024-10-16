import bigDecimal from "js-big-decimal";

type ProductName = string;

type Product = {
    name: ProductName
    price: bigDecimal
    taxPercentage: bigDecimal
}

export { Product, ProductName}