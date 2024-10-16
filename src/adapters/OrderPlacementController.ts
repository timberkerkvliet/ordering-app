import { OrderPlacementUseCase } from '../interaction/OderPlacementUseCase';
import { HttpController, HttpRequest, HttpResponse } from './HttpController';
import { NotFoundError } from '../interaction/NotFoundError';

class OrderPlacementController implements HttpController {
    constructor(
      private readonly useCase: OrderPlacementUseCase
    ) {}

    handle(request: HttpRequest): HttpResponse {
        const items = request.body.items;

        try {
          const orderId = this.useCase.handle(items);
          return new HttpResponse().status(200).json({orderId: orderId.value});
        } catch (error) {
          if (error instanceof NotFoundError) {
            return new HttpResponse().status(404).json({ message: 'Order not found' });
          }
          return new HttpResponse().status(400).json({message: (error as Error).message})
        }
        
      };
}

export { OrderPlacementController }