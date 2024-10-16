import { NotFoundError } from '../interaction/NotFoundError';
import { OrderStatusUseCase } from '../interaction/OrderStatusUseCase';
import { HttpController, HttpRequest, HttpResponse } from './HttpController';
import { OrderId } from '../domain/Order';

class OrderApprovalController implements HttpController {
    constructor(private readonly useCase: OrderStatusUseCase) {}

    handle(request: HttpRequest): HttpResponse {
        const { orderId } = request.body;
        this.useCase.approve(new OrderId(orderId));
        return new HttpResponse().status(200).json({message: 'Order status updated successfully'});
      };
}

export { OrderApprovalController }