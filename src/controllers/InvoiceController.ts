import { Request, Response } from 'express';
import { ProductCatalog } from '../repository/ProductCatalog';
import bigDecimal from 'js-big-decimal';
import { OrderRepository } from '../repository/OrderRepository';
import { OrderStatus } from "../domain/OrderStatus";

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

      if (order.data.status !== OrderStatus.SHIPPED) {
        return res.status(400).json({ message: 'Order is not shipped' });
      }

      return res.status(200).json(
        {
          products: order.data.items.map((item) => { return {name: item.product.name, quantity: item.quantity}}),
          total: order.data.total.getValue() + " " + order.data.currency,
          totalTax: order.data.tax.getValue() + " " + order.data.currency
        });
      
      };
}

export { InvoiceController }