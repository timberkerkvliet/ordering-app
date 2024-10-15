import { AddProductUseCase } from '../interaction/AddProductUseCase';
import { HttpController, HttpRequest, HttpResponse } from './HttpController';

class AddProductController implements HttpController {
    constructor(private readonly addProductUseCase: AddProductUseCase) {
    }

    handle(req: HttpRequest): HttpResponse {
        this.addProductUseCase.handle(req.body.name, req.body.taxPercentage, req.body.price);
    
        return new HttpResponse().status(200).json({ message: 'Product added successfully'});
      };
}

export { AddProductController }