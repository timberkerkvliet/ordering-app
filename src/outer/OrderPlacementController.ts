import { Request, Response } from 'express';
import { OrderRepositoryInMemory } from '../adapters/OrderRepositoryInMemory';
import { Order } from '../domain/Order';
import { ProductCatalogInMemory } from '../adapters/ProductCatalogInMemory';

class OrderPlacementController {
  private readonly repository: OrderRepositoryInMemory
  private readonly productCatalog: ProductCatalogInMemory

    constructor() {
      this.repository = new OrderRepositoryInMemory();
      this.productCatalog = new ProductCatalogInMemory();
    }

    handle(req: Request, res: Response) {
        const items = req.body.items;

        if (items.length === 0) {
          return res.status(400).json({message: 'Order must contain products'})
        }

        let order = Order.emptyOrder(this.repository.maxId() + 1);

        for (let itemRequest of items) {
            let product = this.productCatalog.getByName(itemRequest.productName);
            if (product === undefined) {
              return res.status(404).json({ message: 'Product not found' });
            }

            order = order.addProduct(product, itemRequest.quantity);
        }
        this.repository.save(order);
        return res.status(200).json({orderId: order.data.id});
      
      };
}

export { OrderPlacementController }