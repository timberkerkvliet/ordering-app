import { AddProductUseCase } from '../interaction/AddProductUseCase';
import { HttpController, HttpRequest, HttpResponse } from './HttpController';
import { Product } from '../domain/Product';
import bigDecimal from 'js-big-decimal';
import { Money } from '../domain/Money';

class AddProductController implements HttpController {
    constructor(private readonly addProductUseCase: AddProductUseCase) {
    }

    handle(req: HttpRequest): HttpResponse {
      const product: Product = {
        name: req.body.name,
        taxPercentage: new bigDecimal(req.body.taxPercentage),
        price: Money.fromString(req.body.price, "EUR")
      }
        this.addProductUseCase.handle(product);
    
        return new HttpResponse().status(200).json({ message: 'Product added successfully'});
      };
}

export { AddProductController }