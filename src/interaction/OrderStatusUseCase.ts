import { OrderRepository } from './OrderRepository';
import { Order, OrderId } from '../domain/Order';
import { NotFoundError } from './NotFoundError';

class OrderStatusUseCase {

    constructor(private readonly repository: OrderRepository) {}

    private handleMethod(orderId: OrderId, method: (value: Order) => Order) {
        let order = this.repository.getById(orderId);
    
        if (!order) {
          throw new NotFoundError('Order not found');
        }

        order = method(order);
        
        this.repository.save(order);  
      };
    
    public approve(orderId: OrderId) {
        this.handleMethod(orderId, (order: Order) => order.approve())
    }

    public reject(orderId: OrderId) {
        this.handleMethod(orderId, (order: Order) => order.reject())
    }

    public ship(orderId: OrderId) {
        this.handleMethod(orderId, (order: Order) => order.ship())
    }
}

export { OrderStatusUseCase }