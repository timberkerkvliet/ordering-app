import { Order } from "../domain/Order";

export class OrderRepository {
    private static orders: Map<number, Order> = new Map();
    
    clear(): void {
        OrderRepository.orders = new Map();
    }

    save(order: Order): void {
        OrderRepository.orders.set(order.data.id, order);
    }

    getById(id: number): Order | undefined {
        return OrderRepository.orders.get(id);
    }

    maxId(): number {
        const orders = OrderRepository.orders;
        return orders.size === 0 ? 0 : Math.max(...orders.keys());
    }

}
