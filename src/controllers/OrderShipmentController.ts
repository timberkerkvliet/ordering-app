import { Request, Response } from 'express';
import { OrderRepository } from '../repository/OrderRepository';
import { OrderStatus } from '../domain/OrderStatus';
import { ShipmentService } from '../service/ShipmentService';

class OrderShipmentController {
  private readonly repository: OrderRepository
  private readonly shipmentService: ShipmentService

    constructor() {
      this.repository = new OrderRepository();
      this.shipmentService = new ShipmentService();
    }

    handle(req: Request, res: Response) {
        const { orderId } = req.body;
    
        const order = this.repository.getById(orderId);

        if (!order) {
          return res.status(404).json({ message: 'Order not found' });
        }

        if (order.status === OrderStatus.CREATED || order.status === OrderStatus.REJECTED) {
          return res.status(400).json({ message: 'Order cannot be shipped' });
        }

        if (order.status == OrderStatus.SHIPPED) {
          return res.status(400).json({ message: 'Order cannot be shipped twice' });
        }

        this.shipmentService.ship(order);

        order.status = OrderStatus.SHIPPED;
        this.repository.save(order);

        return res.status(200);
      
      };
}

export { OrderShipmentController }