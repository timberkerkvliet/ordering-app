import { OrderRepository } from "./OrderRepository";
import { createInvoice, Invoice } from "../domain/Invoice";
import { NotFoundError } from "./NotFoundError";

class InvoiceUseCase {
    constructor(private readonly repository: OrderRepository) {}

    public handle(orderId: number): Invoice {
        const order = this.repository.getById(orderId);

        if (!order) {
            throw new NotFoundError('Order not found');
        }
      
        return createInvoice(order.data);
    }
}

export { InvoiceUseCase }