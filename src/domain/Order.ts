import { OrderStatus } from "./OrderStatus";
import { createOrderItemFromProduct, OrderItem } from "./OrderItem";
import bigDecimal from "js-big-decimal";
import { Product } from "./Product";
import { Quantity } from "./Quantity";

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

export { Order, OrderData}