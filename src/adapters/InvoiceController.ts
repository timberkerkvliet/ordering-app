import { InvoiceUseCase } from '../interaction/InvoiceUseCase';
import { NotFoundError } from '../interaction/NotFoundError';
import { HttpController, HttpRequest, HttpResponse } from './HttpController';
import { OrderId } from '../domain/Order';
import { Invoice } from '../domain/Invoice'

class InvoiceController implements HttpController {
    constructor(private readonly useCase: InvoiceUseCase) {}

    private serialize(invoice: Invoice): any {
      return {
        products: invoice.products.map((item) => { return {name: item.productName, quantity: item.quantity.value}}),
        total: invoice.total.value.getValue() + " " + invoice.total.currency,
        totalTax: invoice.totalTax.value.getValue() + " " + invoice.totalTax.currency
      }
    }

    handle(request: HttpRequest): HttpResponse {
      const { orderId } = request.body;
      const invoice = this.useCase.handle(new OrderId(orderId));
      return new HttpResponse().status(200).json(this.serialize(invoice));
    };
}

export { InvoiceController }