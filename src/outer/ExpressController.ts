import { Request, Response } from 'express';
import { HttpController } from '../adapters/HttpController';

class ExpressController {
    constructor(private readonly contoller: HttpController) {}

    handle(req: Request, res: Response) {
        const response = this.contoller.handle({body: req.body});
        res.status(response.getStatus()!).json(response.getJson());
    }

}

export { ExpressController }