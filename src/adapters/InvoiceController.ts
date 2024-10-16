import { InvoiceUseCase } from '../interaction/InvoiceUseCase';
import { NotFoundError } from '../interaction/NotFoundError';
import { HttpController, HttpRequest, HttpResponse } from './HttpController';

class InvoiceController implements HttpController {
    constructor(private readonly useCase: InvoiceUseCase) {}

    handle(request: HttpRequest): HttpResponse {
      const { orderId } = request.body;

      try {
        const invoice = this.useCase.handle(orderId);
        const serializedInvoice = {
          products: invoice.products.map((item) => { return {name: item.productName, quantity: item.quantity.value}}),
          total: invoice.total.value.getValue() + " " + invoice.total.currency,
          totalTax: invoice.totalTax.value.getValue() + " " + invoice.totalTax.currency
        }
        return new HttpResponse().status(200).json(serializedInvoice);
      } catch (error) {
        if (error instanceof NotFoundError) {
          return new HttpResponse().status(404).json({message: error.message})
        }
        return new HttpResponse().status(400).json({message: (error as Error).message})
      }
      
      };
}

export { InvoiceController }