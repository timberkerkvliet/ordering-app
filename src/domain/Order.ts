import { OrderStatus } from "./OrderStatus";
import { OrderItem } from "./OrderItem";
import bigDecimal from "js-big-decimal";
import { Product } from "./Product";

type OrderData = {
    total: bigDecimal;
    currency: string;
    items: OrderItem[];
    tax: bigDecimal;
    status: OrderStatus;
    id: number;
}

class Order {
    constructor(public readonly data: OrderData) {}

    public static emptyOrder(orderId: number): Order {
        return new Order({
            id: orderId,
            status: OrderStatus.CREATED,
            items: [],
            currency: "EUR",
            total: new bigDecimal("0.00"),
            tax: new bigDecimal("0.00")
          })
    }
    
    public addProduct(product: Product, quantity: number): Order {
        const unitaryTax = product.price.divide(new bigDecimal(100)).multiply(product.category.taxPercentage).round(2);
        const unitaryTaxedAmount = product.price.add(unitaryTax).round(2);
        const taxedAmount = unitaryTaxedAmount.multiply(new bigDecimal(quantity)).round(2);
        const taxAmount = unitaryTax.multiply(new bigDecimal(quantity));
        const orderItem: OrderItem = {
            product: product,
            quantity: quantity,
            tax: taxAmount,
            taxedAmount: taxedAmount
        }
        return new Order(
            {
                ...this.data,
                items: [...this.data.items , orderItem],
                total: this.data.total.add(taxedAmount),
                tax: this.data.tax.add(taxAmount)
            }
        );
    }

}

export { Order, OrderData}