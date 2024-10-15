import { Product } from "./Product";
import bigDecimal from "js-big-decimal";

type OrderItem = {
    product: Product;
    quantity: number;
    taxedAmount: bigDecimal;
    tax: bigDecimal;
}

function createOrderItemFromProduct(product: Product, quantity: number): OrderItem {
    const unitaryTax = product.price.divide(new bigDecimal(100)).multiply(product.taxPercentage).round(2);
        const unitaryTaxedAmount = product.price.add(unitaryTax).round(2);
        const taxedAmount = unitaryTaxedAmount.multiply(new bigDecimal(quantity)).round(2);
        const taxAmount = unitaryTax.multiply(new bigDecimal(quantity));
        return {
            product: product,
            quantity: quantity,
            tax: taxAmount,
            taxedAmount: taxedAmount
        }
}

export { OrderItem, createOrderItemFromProduct}