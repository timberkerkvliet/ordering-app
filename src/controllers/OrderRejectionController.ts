import { Request, Response } from 'express';
import { OrderRepository } from '../repository/OrderRepository';
import { OrderStatus } from '../domain/OrderStatus';

class OrderRejectionController {
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
    
        if (order.status === OrderStatus.SHIPPED) {
          return res.status(400).json({ message: 'shipped orders cannot be changed' });
        }

        if (order.status === OrderStatus.APPROVED) {
          return res.status(400).json({ message: 'approved orders cannot be rejected' });
        }
    
        order.status = OrderStatus.REJECTED;
    
        this.repository.save(order);
    
        return res.status(200).json({ message: 'Order status updated successfully' });
      
      };
}

export { OrderRejectionController }