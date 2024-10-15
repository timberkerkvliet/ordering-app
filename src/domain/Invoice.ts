import { OrderData } from "./Order";
import { OrderStatus } from "./OrderStatus";

type Invoice = {
    products: {name: string, quantity: number}[],
    total: string,
    totalTax: string
}

function createInvoice(order: OrderData): Invoice {
    if (order.status !== OrderStatus.SHIPPED) {
        throw new Error('Order is not shipped');
      }
    return {
        products: order.items.map((item) => { return {name: item.product.name, quantity: item.quantity}}),
        total: order.total.getValue() + " " + order.currency,
        totalTax: order.tax.getValue() + " " + order.currency
      }
}

export { Invoice, createInvoice}