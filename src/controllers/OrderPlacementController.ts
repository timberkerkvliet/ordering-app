import { Request, Response } from 'express';
import { OrderRepository } from '../repository/OrderRepository';
import { OrderStatus } from '../domain/OrderStatus';
import bigDecimal from 'js-big-decimal';
import { Order } from '../domain/Order';
import { OrderItem } from '../domain/OrderItem';
import { ProductCatalog } from '../repository/ProductCatalog';

class OrderPlacementController {
  private readonly repository: OrderRepository
  private readonly productCatalog: ProductCatalog

    constructor() {
      this.repository = new OrderRepository();
      this.productCatalog = new ProductCatalog();
    }

    handle(req: Request, res: Response) {
        const items = req.body.items;

        if (items.length === 0) {
          return res.status(400).json({message: 'Order must contain products'})
        }

        let order: Order = {
          id: this.repository.maxId() + 1,
          status: OrderStatus.CREATED,
          items: [],
          currency: "EUR",
          total: new bigDecimal("0.00"),
          tax: new bigDecimal("0.00")
        };

        for (let itemRequest of items) {
            let product = this.productCatalog.getByName(itemRequest.productName);

            if (product === undefined) {
              return res.status(404).json({ message: 'Product not found' });
            } else {
                const unitaryTax = product.price.divide(new bigDecimal(100)).multiply(product.category.taxPercentage).round(2);
                const unitaryTaxedAmount = product.price.add(unitaryTax).round(2);
                const taxedAmount = unitaryTaxedAmount.multiply(new bigDecimal(itemRequest.quantity)).round(2);
                const taxAmount = unitaryTax.multiply(new bigDecimal(itemRequest.quantity));

                let orderItem: OrderItem = {
                  product: product,
                  quantity: itemRequest.quantity,
                  tax: taxAmount,
                  taxedAmount: taxedAmount
                }
                order.items.push(orderItem);

                order.total = order.total.add(taxedAmount);
                order.tax = order.tax.add(taxAmount);
            }
        }
        this.repository.save(order);
        return res.status(200).json({orderId: order.id});
      
      };
}

export { OrderPlacementController }