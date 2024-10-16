import { OrderData } from "./Order";
import { OrderStatus } from "./OrderStatus";
import { ProductQuantity } from "./ProductQuantity";
import { Money } from "./Money";

type Invoice = {
    products: ProductQuantity[],
    total: Money,
    totalTax: Money
}

function createInvoice(order: OrderData): Invoice {
    if (order.status !== OrderStatus.SHIPPED) {
        throw new Error('Order is not shipped');
      }
    return {
        products: order.items.map((item) => { return item.productQuantity}),
        total: order.total,
        totalTax: order.tax
      }
}

export { Invoice, createInvoice}