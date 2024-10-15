import { Request, Response } from 'express';
import { OrderRepositoryInMemory } from '../adapters/OrderRepositoryInMemory';
import { OrderStatus } from '../domain/OrderStatus';
import { NotFoundError } from '../interaction/NotFoundError';
import { OrderStatusUseCase } from '../interaction/OrderStatusUseCase';

class OrderApprovalController {
    constructor(private readonly useCase: OrderStatusUseCase) {}

    handle(req: Request, res: Response) {
        const { orderId } = req.body;
        try {
          this.useCase.approve(orderId);
        } catch (error) {
          if (error instanceof NotFoundError) {
            return res.status(404).json({ message: 'Order not found' });
          }
          return res.status(400).json({message: (error as Error).message})
        }
        
        return res.status(200).json({message: 'Order status updated successfully'});
      
      };
}

export { OrderApprovalController }