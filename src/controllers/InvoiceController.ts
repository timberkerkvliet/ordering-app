import { Request, Response } from 'express';
import { ProductCatalog } from '../repository/ProductCatalog';
import bigDecimal from 'js-big-decimal';
import { OrderRepository } from '../repository/OrderRepository';
import { OrderStatus } from "../domain/OrderStatus";
import { createInvoice } from '../domain/Invoice';

class InvoiceController {
    private repository: OrderRepository;

    constructor() {
      this.repository = new OrderRepository();
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