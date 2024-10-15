import { Request, Response } from 'express';
import { ProductCatalogInMemory } from '../adapters/ProductCatalogInMemory';
import bigDecimal from 'js-big-decimal';
import { OrderRepositoryInMemory } from '../adapters/OrderRepositoryInMemory';
import { OrderStatus } from "../domain/OrderStatus";
import { createInvoice } from '../domain/Invoice';

class InvoiceController {
    private repository: OrderRepositoryInMemory;

    constructor() {
      this.repository = new OrderRepositoryInMemory();
    }

    handle(req: Request, res: Response) {
      const { orderId } = req.body;
    
      const order = this.repository.getById(orderId);

      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      
      try {
        const invoice = createInvoice(order.data);
        return res.status(200).json(invoice);
      } catch (error) {
        return res.status(400).json({message: (error as Error).message})
      }
      
      };
}

export { InvoiceController }