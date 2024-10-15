import { Request, Response } from 'express';
import { OrderRepositoryInMemory } from '../adapters/OrderRepositoryInMemory';
import { OrderStatus } from '../domain/OrderStatus';

class OrderShipmentController {
  private readonly repository: OrderRepositoryInMemory

    constructor() {
      this.repository = new OrderRepositoryInMemory();
    }

    handle(req: Request, res: Response) {
        const { orderId } = req.body;
    
        let order = this.repository.getById(orderId);

        if (!order) {
          return res.status(404).json({ message: 'Order not found' });
        }
        try {
        order = order.ship();
      } catch (error) {
        return res.status(400).json({message: (error as Error).message})
      }
        this.repository.save(order);

        return res.status(200).json({message: 'Order shipped'});
      
      };
}

export { OrderShipmentController }