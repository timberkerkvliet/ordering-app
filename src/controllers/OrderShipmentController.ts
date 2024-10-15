import { Request, Response } from 'express';
import { OrderRepository } from '../repository/OrderRepository';
import { OrderStatus } from '../domain/OrderStatus';

class OrderShipmentController {
  private readonly repository: OrderRepository

    constructor() {
      this.repository = new OrderRepository();
    }

    handle(req: Request, res: Response) {
        const { orderId } = req.body;
    
        const order = this.repository.getById(orderId);

        if (!order) {
          return res.status(404).json({ message: 'Order not found' });
        }

        if (order.data.status === OrderStatus.CREATED || order.data.status === OrderStatus.REJECTED) {
          return res.status(400).json({ message: 'Order cannot be shipped' });
        }

        if (order.data.status == OrderStatus.SHIPPED) {
          return res.status(400).json({ message: 'Order cannot be shipped twice' });
        }

        order.data.status = OrderStatus.SHIPPED;
        this.repository.save(order);

        return res.status(200).json({message: 'Order shipped'});
      
      };
}

export { OrderShipmentController }