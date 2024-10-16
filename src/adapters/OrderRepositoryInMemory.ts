import { Order, OrderId } from "../domain/Order";
import { OrderRepository } from "../interaction/OrderRepository";

export class OrderRepositoryInMemory implements OrderRepository {
    private static orders: Map<number, Order> = new Map();
    
    clear(): void {
        OrderRepositoryInMemory.orders = new Map();
    }

    save(order: Order): void {
        OrderRepositoryInMemory.orders.set(order.data.id.value, order);
    }

    getById(id: OrderId): Order | undefined {
        return OrderRepositoryInMemory.orders.get(id.value);
    }

    maxId(): OrderId {
        const orders = OrderRepositoryInMemory.orders;
        const n = orders.size === 0 ? 0 : Math.max(...orders.keys());
        return new OrderId(n);
    }

}
