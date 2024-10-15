import { Request, Response } from 'express';
import { OrderStatusUseCase } from '../interaction/OrderStatusUseCase';
import { NotFoundError } from '../interaction/NotFoundError';

class OrderRejectionController {
    constructor(private readonly useCase: OrderStatusUseCase) {}

    handle(req: Request, res: Response) {
        const { orderId } = req.body;

        try {
          this.useCase.reject(orderId);
        } catch (error) {
          if (error instanceof NotFoundError) {
            return res.status(404).json({ message: 'Order not found' });
          }
          return res.status(400).json({message: (error as Error).message})
        }
    
        return res.status(200).json({ message: 'Order status updated successfully' });
      
      };
}

export { OrderRejectionController }