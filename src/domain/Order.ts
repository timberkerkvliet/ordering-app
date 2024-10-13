import { OrderStatus } from "./OrderStatus";
import { OrderItem } from "./OrderItem";
import bigDecimal from "js-big-decimal";

export type Order = {
    total: bigDecimal;
    currency: string;
    items: OrderItem[];
    tax: bigDecimal;
    status: OrderStatus;
    id: number;
}
