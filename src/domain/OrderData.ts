import { OrderStatus } from "./OrderStatus";
import { OrderItem } from "./OrderItem";
import { Money } from "./Money";
import { OrderId } from "./OrderId";

export type OrderData = {
    total: Money;
    items: OrderItem[];
    tax: Money;
    status: OrderStatus;
    id: OrderId;
};
