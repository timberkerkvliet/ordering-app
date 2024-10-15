import { InvoiceUseCase } from '../interaction/InvoiceUseCase';
import { NotFoundError } from '../interaction/NotFoundError';
import { HttpController, HttpRequest, HttpResponse } from './HttpController';

class InvoiceController implements HttpController {
    constructor(private readonly useCase: InvoiceUseCase) {}

    handle(request: HttpRequest): HttpResponse {
      const { orderId } = request.body;

      try {
        const invoice = this.useCase.handle(orderId);
        return new HttpResponse().status(200).json(invoice);
      } catch (error) {
        if (error instanceof NotFoundError) {
          return new HttpResponse().status(404).json({message: error.message})
        }
        return new HttpResponse().status(400).json({message: (error as Error).message})
      }
      
      };
}

export { InvoiceController }