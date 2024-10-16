import { Order } from '../domain/Order';
import { OrderRepository } from '../interaction/OrderRepository';
import { ProductCatalog } from '../interaction/ProductCatalog';
import { NotFoundError } from './NotFoundError';

class OrderPlacementUseCase {
    constructor(
        private readonly repository: OrderRepository,
        private readonly productCatalog: ProductCatalog
    ) {}

    handle(items: any): number {
        if (items.length === 0) {
            throw new Error('Order must contain products');
        }

        let order = Order.emptyOrder(this.repository.maxId() + 1);

        for (let itemRequest of items) {
            let product = this.productCatalog.getByName(itemRequest.productName);
            if (product === undefined) {
                throw new NotFoundError('Product not found');
            }

            order = order.addProduct(product, itemRequest.quantity);
        }
        this.repository.save(order);
        return order.data.id;
      };
}

export { OrderPlacementUseCase }