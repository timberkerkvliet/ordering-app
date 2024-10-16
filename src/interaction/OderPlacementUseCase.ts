import { Order, OrderId } from '../domain/Order';
import { ProductQuantity } from '../domain/ProductQuantity';
import { Quantity } from '../domain/Quantity';
import { OrderRepository } from '../interaction/OrderRepository';
import { ProductCatalog } from '../interaction/ProductCatalog';
import { NotFoundError } from './NotFoundError';

class OrderPlacementUseCase {
    constructor(
        private readonly repository: OrderRepository,
        private readonly productCatalog: ProductCatalog
    ) {}

    handle(items: ProductQuantity[]): OrderId {
        let order;
        for (let productQuantity of items) {
            let product = this.productCatalog.getByName(productQuantity.productName);
            if (product === undefined) {
                throw new NotFoundError('Product not found');
            }
            if (order === undefined) {
                order = Order.createOrder(this.repository.maxId(), productQuantity , product)
            } else {
                order = order.addProduct(productQuantity, product);
            }            
        }

        if (order === undefined) {
            throw new Error('Order must contain products');
        }

        this.repository.save(order);
        return order.data.id;
      };
}

export { OrderPlacementUseCase }