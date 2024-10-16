import { OrderStatus } from "./OrderStatus";
import { createOrderItemFromProduct } from "./OrderItem";
import bigDecimal from "js-big-decimal";
import { Product } from "./Product";
import { Money } from "./Money";
import { ProductQuantity } from "./ProductQuantity";
import { OrderId } from "./OrderId";
import { OrderData } from "./OrderData";

class Order {
    constructor(public readonly data: OrderData) {}

    public static createOrder(orderId: OrderId, productQuantity: ProductQuantity, product: Product): Order {
        return new Order({
            id: orderId.next(),
            status: OrderStatus.CREATED,
            items: [],
            total: new Money(new bigDecimal("0.00"), "EUR"),
            tax: new Money(new bigDecimal("0.00"), "EUR")
          }).addProduct(productQuantity, product);
    }
    
    public addProduct(productQuantity: ProductQuantity, product: Product): Order {
        const orderItem = createOrderItemFromProduct(productQuantity, product);
        return new Order(
            {
                ...this.data,
                items: [...this.data.items , orderItem],
                total: this.data.total.add(orderItem.taxedAmount),
                tax: this.data.tax.add(orderItem.tax)
            }
        );
    }

    public approve(): Order {
        if (this.data.status === OrderStatus.SHIPPED) {
            throw new Error('shipped orders cannot be changed');
          }
          if (this.data.status === OrderStatus.REJECTED) {
            throw new Error('rejected orders cannot be approved');
          }
        
          return new Order({...this.data, status: OrderStatus.APPROVED });
    }

    public reject(): Order {
        if (this.data.status === OrderStatus.SHIPPED) {
            throw new Error('shipped orders cannot be changed');
        }
        if (this.data.status === OrderStatus.APPROVED) {
            throw new Error('approved orders cannot be rejected');
        }

        return new Order({...this.data, status: OrderStatus.REJECTED });
    }

    public ship(): Order {
        if (this.data.status === OrderStatus.CREATED || this.data.status === OrderStatus.REJECTED) {
            throw new Error('Order cannot be shipped');
        }
        if (this.data.status == OrderStatus.SHIPPED) {
            throw new Error('Order cannot be shipped twice');
        }

        return new Order({...this.data, status: OrderStatus.SHIPPED });
    }

}

export { Order, OrderData, OrderId}