import { OrderPlacementUseCase } from '../interaction/OderPlacementUseCase';
import { HttpController, HttpRequest, HttpResponse } from './HttpController';
import { Quantity } from '../domain/Quantity';

class OrderPlacementController implements HttpController {
    constructor(
      private readonly useCase: OrderPlacementUseCase
    ) {}

    handle(request: HttpRequest): HttpResponse {
        const items = request.body.items;
        const orderId = this.useCase.handle(items.map((item: any) => {
          return {
            productName: item.productName,
            quantity: new Quantity(item.quantity)
          }
        }));
        return new HttpResponse().status(200).json({orderId: orderId.value});
      };
}

export { OrderPlacementController }