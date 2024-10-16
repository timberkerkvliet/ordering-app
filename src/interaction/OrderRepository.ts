import { Order, OrderId } from "../domain/Order";

export interface OrderRepository {
    clear(): void;
    save(order: Order): void;
    getById(id: OrderId): Order | undefined;
    maxId(): OrderId;
}