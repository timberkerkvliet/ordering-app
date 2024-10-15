import { Order } from "../domain/Order";

export interface OrderRepository {
    clear(): void;
    save(order: Order): void;
    getById(id: number): Order | undefined;
    maxId(): number;
}