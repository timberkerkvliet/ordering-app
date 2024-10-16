import { HttpController, HttpRequest, HttpResponse } from './HttpController';
import { NotFoundError } from '../interaction/NotFoundError';

class ErrorHandlingController implements HttpController {
    constructor(private readonly controller: HttpController) {
    }

    handle(request: HttpRequest): HttpResponse {
        try {
            return this.controller.handle(request);
        } catch (error) {
            if (error instanceof NotFoundError) {
              return new HttpResponse().status(404).json({message: error.message})
            }
            if (error instanceof Error) {
              return new HttpResponse().status(400).json({message: error.message})
            }
            return new HttpResponse().status(500);
          }
      };
}

export { ErrorHandlingController }