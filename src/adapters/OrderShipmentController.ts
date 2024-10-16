import { OrderStatusUseCase} from '../interaction/OrderStatusUseCase';
import { NotFoundError} from '../interaction/NotFoundError';
import { HttpController, HttpRequest, HttpResponse } from './HttpController';
import { OrderId } from '../domain/Order';

class OrderShipmentController implements HttpController {
    constructor(private readonly useCase: OrderStatusUseCase) {}

    handle(request: HttpRequest): HttpResponse {
        const { orderId } = request.body;
        this.useCase.ship(new OrderId(orderId));
        return new HttpResponse().status(200).json({message: 'Order shipped'});  
      };
}

export { OrderShipmentController }