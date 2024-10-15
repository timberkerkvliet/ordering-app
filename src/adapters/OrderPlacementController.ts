import { OrderRepositoryInMemory } from '../adapters/OrderRepositoryInMemory';
import { Order } from '../domain/Order';
import { ProductCatalogInMemory } from '../adapters/ProductCatalogInMemory';
import { HttpController, HttpRequest, HttpResponse } from './HttpController';

class OrderPlacementController implements HttpController {
  private readonly repository: OrderRepositoryInMemory
  private readonly productCatalog: ProductCatalogInMemory

    constructor() {
      this.repository = new OrderRepositoryInMemory();
      this.productCatalog = new ProductCatalogInMemory();
    }

    handle(request: HttpRequest): HttpResponse {
        const items = request.body.items;

        if (items.length === 0) {
          return new HttpResponse().status(400).json({message: 'Order must contain products'})
        }

        let order = Order.emptyOrder(this.repository.maxId() + 1);

        for (let itemRequest of items) {
            let product = this.productCatalog.getByName(itemRequest.productName);
            if (product === undefined) {
              return new HttpResponse().status(404).json({ message: 'Product not found' });
            }

            order = order.addProduct(product, itemRequest.quantity);
        }
        this.repository.save(order);
        return new HttpResponse().status(200).json({orderId: order.data.id});
      
      };
}

export { OrderPlacementController }