import { Request, Response } from 'express';
import { ProductCatalogInMemory } from '../adapters/ProductCatalogInMemory';
import bigDecimal from 'js-big-decimal';
import { OrderRepositoryInMemory } from '../adapters/OrderRepositoryInMemory';
import { OrderStatus } from "../domain/OrderStatus";
import { createInvoice } from '../domain/Invoice';
import { InvoiceUseCase } from '../interaction/InvoiceUseCase';
import { NotFoundError } from '../interaction/NotFoundError';

class InvoiceController {
    constructor(private readonly useCase: InvoiceUseCase) {}

    handle(req: Request, res: Response) {
      const { orderId } = req.body;

      try {
        const invoice = this.useCase.handle(orderId);
        return res.status(200).json(invoice);
      } catch (error) {
        if (error instanceof NotFoundError) {
          return res.status(404).json({message: error.message})
        }
        return res.status(400).json({message: (error as Error).message})
      }
      
      };
}

export { InvoiceController }