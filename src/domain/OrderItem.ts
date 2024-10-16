import { ProductQuantity } from "./ProductQuantity";

import bigDecimal from "js-big-decimal";
import { Product } from "./Product";

type OrderItem = {
    productQuantity: ProductQuantity;
    taxedAmount: bigDecimal;
    tax: bigDecimal;
}

function createOrderItemFromProduct(
    productQuantity: ProductQuantity,
    product: Product
): OrderItem {
    const unitaryTax = product.price.divide(new bigDecimal(100)).multiply(product.taxPercentage).round(2);
        const unitaryTaxedAmount = product.price.add(unitaryTax).round(2);
        const taxedAmount = unitaryTaxedAmount.multiply(new bigDecimal(productQuantity.quantity.value)).round(2);
        const taxAmount = unitaryTax.multiply(new bigDecimal(productQuantity.quantity.value));
        return {
            productQuantity: productQuantity,
            tax: taxAmount,
            taxedAmount: taxedAmount
        }
}

export { OrderItem, createOrderItemFromProduct}