import bigDecimal from "js-big-decimal";

type Product = {
    name: string
    price: bigDecimal
    taxPercentage: bigDecimal
}

export { Product}