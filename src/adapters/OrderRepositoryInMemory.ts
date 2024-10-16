import { Order } from "../domain/Order";
import { OrderRepository } from "../interaction/OrderRepository";

export class OrderRepositoryInMemory implements OrderRepository {
    private static orders: Map<number, Order> = new Map();
    
    clear(): void {
        OrderRepositoryInMemory.orders = new Map();
    }

    save(order: Order): void {
        OrderRepositoryInMemory.orders.set(order.data.id, order);
    }

    getById(id: number): Order | undefined {
        return OrderRepositoryInMemory.orders.get(id);
    }

    maxId(): number {
        const orders = OrderRepositoryInMemory.orders;
        return orders.size === 0 ? 0 : Math.max(...orders.keys());
    }

}
