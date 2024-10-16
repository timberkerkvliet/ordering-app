import { ProductQuantity } from "./ProductQuantity";

import { Money } from "./Money";
import { Product } from "./Product";
import bigDecimal from "js-big-decimal";

type OrderItem = {
    productQuantity: ProductQuantity;
    taxedAmount: Money;
    tax: Money;
}

function createOrderItemFromProduct(
    productQuantity: ProductQuantity,
    product: Product
): OrderItem {
    const unitaryTax = product.price.divide(new bigDecimal(100)).multiply(product.taxPercentage).round();
    const unitaryTaxedAmount = product.price.add(unitaryTax).round();
    const taxedAmount = unitaryTaxedAmount.multiply(new bigDecimal(productQuantity.quantity.value)).round();
    const taxAmount = unitaryTax.multiply(new bigDecimal(productQuantity.quantity.value));
    return {
        productQuantity: productQuantity,
        tax: taxAmount,
        taxedAmount: taxedAmount
    }
}

export { OrderItem, createOrderItemFromProduct}