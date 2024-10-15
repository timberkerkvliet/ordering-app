import { NotFoundError } from '../interaction/NotFoundError';
import { OrderStatusUseCase } from '../interaction/OrderStatusUseCase';
import { HttpController, HttpRequest, HttpResponse } from './HttpController';

class OrderApprovalController implements HttpController {
    constructor(private readonly useCase: OrderStatusUseCase) {}

    handle(request: HttpRequest): HttpResponse {
        const { orderId } = request.body;
        try {
          this.useCase.approve(orderId);
        } catch (error) {
          if (error instanceof NotFoundError) {
            return new HttpResponse().status(404).json({ message: 'Order not found' });
          }
          return new HttpResponse().status(400).json({message: (error as Error).message})
        }
        
        return new HttpResponse().status(200).json({message: 'Order status updated successfully'});
      
      };
}

export { OrderApprovalController }