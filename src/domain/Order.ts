import { OrderStatus } from "./OrderStatus";
import { createOrderItemFromProduct, OrderItem } from "./OrderItem";
import bigDecimal from "js-big-decimal";
import { Product } from "./Product";
import { Quantity } from "./Quantity";
import { Money } from "./Money";

class OrderId {
    constructor(public readonly value: number) {
        const isPositiveInteger = Number.isInteger(value) && value >= 0;
        if (!isPositiveInteger) {
            throw new Error('Not an order id');
        }
    }

    public next() {
        return new OrderId(this.value + 1);
    }
}

type OrderData = {
    total: Money;
    items: OrderItem[];
    tax: Money;
    status: OrderStatus;
    id: OrderId;
}

class Order {
    constructor(public readonly data: OrderData) {}

    public static emptyOrder(orderId: OrderId): Order {
        return new Order({
            id: orderId.next(),
            status: OrderStatus.CREATED,
            items: [],
            total: new Money(new bigDecimal("0.00"), "EUR"),
            tax: new Money(new bigDecimal("0.00"), "EUR")
          })
    }
    
    public addProduct(product: Product, quantity: number): Order {
        const orderItem = createOrderItemFromProduct({productName: product.name, quantity: new Quantity(quantity)}, product);
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