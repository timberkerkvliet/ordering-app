import { AddProductController } from "./adapters/AddProductController";
import { OrderPlacementController } from "./adapters/OrderPlacementController";
import { OrderApprovalController } from "./adapters/OrderApprovalController";
import { OrderRejectionController } from "./adapters/OrderRejectionController";
import { OrderShipmentController } from "./adapters/OrderShipmentController";

import { Request, Response} from "express";
import { OrderRepositoryInMemory } from "./adapters/OrderRepositoryInMemory";
import { ProductCatalogInMemory } from "./adapters/ProductCatalogInMemory";
import { InvoiceController } from "./adapters/InvoiceController";
import { AddProductUseCase } from "./interaction/AddProductUseCase";
import { InvoiceUseCase } from "./interaction/InvoiceUseCase";
import { OrderStatusUseCase } from "./interaction/OrderStatusUseCase";
import { ExpressController } from "./outer/ExpressController";

class FakeResponse {
  private statusCode: number | undefined;
  private jsonResponse: any;

  constructor() {
    this.statusCode = undefined;
    this.jsonResponse = undefined;
  }

  status(statusCode: number) {
    this.statusCode = statusCode;
    return this;
  }

  json(jsonResponse: any) {
    this.jsonResponse = jsonResponse;
    return this;
  }

  getStatus(): number | undefined {
    return this.statusCode;
  }

  getJson(): any {
    return this.jsonResponse;
  }

}

function addProduct(body: any): FakeResponse {
  const res = new FakeResponse();
  const controller = new ExpressController(
    new AddProductController(
    new AddProductUseCase(new ProductCatalogInMemory())
    )
  )
  controller.handle({body} as unknown as Request, res as unknown as Response)
  return res;
}

function placeOrder(body: any): FakeResponse {
  const res = new FakeResponse();
  const controller = new ExpressController(new OrderPlacementController());
  controller.handle({body} as unknown as Request, res as unknown as Response)
  return res;
}

function approveOrder(body: any): FakeResponse {
  const res = new FakeResponse();
  const contoller = new ExpressController(new OrderApprovalController(
    new OrderStatusUseCase(new OrderRepositoryInMemory()))
  )
  contoller.handle({body} as unknown as Request, res as unknown as Response)
  return res;
}

function rejectOrder(body: any): FakeResponse {
  const res = new FakeResponse();
  const controller = new ExpressController(new OrderRejectionController(new OrderStatusUseCase(new OrderRepositoryInMemory())));
  controller.handle({body} as unknown as Request, res as unknown as Response)
  return res;
}

function shipOrder(body: any): FakeResponse {
  const res = new FakeResponse();
  const controller = new ExpressController(new OrderShipmentController(new OrderStatusUseCase(new OrderRepositoryInMemory())));
  controller.handle({body} as unknown as Request, res as unknown as Response)
  return res;
}

function getInvoice(body: any): FakeResponse {
  const res = new FakeResponse();
  const contoller = new ExpressController(new InvoiceController(new InvoiceUseCase(new OrderRepositoryInMemory())));
  contoller.handle({body} as unknown as Request, res as unknown as Response)
  return res;
}

describe('Tests', () => {
  beforeEach(() => {
    new OrderRepositoryInMemory().clear();
    new ProductCatalogInMemory().clear();
  });
  test('non placing non existing product', () => {
    expect(placeOrder({items: [{name: "Does not exist", quantity: 1}]}).getStatus()).toBe(404);
  });
  test('empty order', () => {
    const response = placeOrder({items: []});
    expect(response.getStatus()).toBe(400);
    expect(response.getJson()).toStrictEqual({message: 'Order must contain products'})
  });
  test('adding product', () => {
    const response = addProduct(
      {
        name: "My product",
        taxPercentage: "5"
      },
    );
    expect(response.getStatus()).toBe(200);
    expect(response.getJson()).toStrictEqual({message: "Product added successfully"});
  });
  test('returning order id', () => {
    addProduct(
      {
        name: "My product",
        taxPercentage: "5"
      },
    )
    
    const response = placeOrder({items: [{productName: "My product", quantity: 3}]});
    expect(response.getStatus()).toBe(200);
    expect(response.getJson()).toStrictEqual({orderId: expect.any(Number)});
  })
  test('approve order succesfully', () => {
    addProduct(
      {
        name: "My product",
        taxPercentage: "5"
      },
    )
    const orderId = placeOrder({items: [{productName: "My product", quantity: 3}]}).getJson().orderId;
    const response = approveOrder({orderId})
    expect(response.getStatus()).toBe(200);
    expect(response.getJson()).toStrictEqual({message: 'Order status updated successfully'});
  })
  test('approve non existing order', () => {
    const response = approveOrder({orderId: 17})
    expect(response.getStatus()).toBe(404);
    expect(response.getJson()).toStrictEqual({message: 'Order not found'});
  })
  test('approve twice', () => {
    addProduct(
      {
        name: "My product",
        taxPercentage: "5"
      },
    )
    const orderId = placeOrder({items: [{productName: "My product", quantity: 3}]}).getJson().orderId;
    approveOrder({orderId})
    const response = approveOrder({orderId})
    expect(response.getStatus()).toBe(200);
    expect(response.getJson()).toStrictEqual({message: 'Order status updated successfully'});
  })
  test('approve twice', () => {
    addProduct(
      {
        name: "My product",
        taxPercentage: "5"
      },
    )
    const orderId = placeOrder({items: [{productName: "My product", quantity: 3}]}).getJson().orderId;
    approveOrder({orderId})
    const response = approveOrder({orderId})
    expect(response.getStatus()).toBe(200);
    expect(response.getJson()).toStrictEqual({message: 'Order status updated successfully'});
  })
  test('reject order', () => {
    addProduct(
      {
        name: "My product",
        taxPercentage: "5"
      },
    )
    const orderId = placeOrder({items: [{productName: "My product", quantity: 3}]}).getJson().orderId;
    const response = rejectOrder({orderId})
    expect(response.getStatus()).toBe(200);
    expect(response.getJson()).toStrictEqual({message: 'Order status updated successfully'});
  })
  test('reject twice', () => {
    addProduct(
      {
        name: "My product",
        taxPercentage: "5"
      },
    )
    const orderId = placeOrder({items: [{productName: "My product", quantity: 3}]}).getJson().orderId;
    rejectOrder({orderId})
    const response = rejectOrder({orderId})
    expect(response.getStatus()).toBe(200);
    expect(response.getJson()).toStrictEqual({message: 'Order status updated successfully'});
  })
  test('reject non existing', () => {
    const response = rejectOrder({orderId: 1})
    expect(response.getStatus()).toBe(404);
    expect(response.getJson()).toStrictEqual({message: 'Order not found'});
  })
  test('cannot approve rejected order', () => {
    addProduct(
      {
        name: "My product",
        taxPercentage: "5"
      },
    )
    const orderId = placeOrder({items: [{productName: "My product", quantity: 3}]}).getJson().orderId;
    rejectOrder({orderId})
    const response = approveOrder({orderId})
    expect(response.getStatus()).toBe(400);
    expect(response.getJson()).toStrictEqual({message: 'rejected orders cannot be approved'});
  })
  test('ship order succesfully', () => {
    addProduct(
      {
        name: "My product",
        taxPercentage: "5"
      },
    )
    const orderId = placeOrder({items: [{productName: "My product", quantity: 3}]}).getJson().orderId;
    approveOrder({orderId})
    const response = shipOrder({orderId})
    expect(response.getStatus()).toBe(200);
    expect(response.getJson()).toStrictEqual({message: 'Order shipped'});
  })
  test('ship non existing order', () => {
    const response = shipOrder({orderId: 1})
    expect(response.getStatus()).toBe(404);
    expect(response.getJson()).toStrictEqual({message: 'Order not found'});
  })
  test('ship rejected order', () => {
    addProduct(
      {
        name: "My product",
        taxPercentage: "5"
      },
    )
    const orderId = placeOrder({items: [{productName: "My product", quantity: 3}]}).getJson().orderId;
    rejectOrder({orderId})
    const response = shipOrder({orderId})
    expect(response.getStatus()).toBe(400);
    expect(response.getJson()).toStrictEqual({message: 'Order cannot be shipped'});
  })
  test('ship non approved order', () => {
    addProduct(
      {
        name: "My product",
        taxPercentage: "5"
      },
    )
    const orderId = placeOrder({items: [{productName: "My product", quantity: 3}]}).getJson().orderId;
    const response = shipOrder({orderId})
    expect(response.getStatus()).toBe(400);
    expect(response.getJson()).toStrictEqual({message: 'Order cannot be shipped'});
  })
  test('ship twice', () => {
    addProduct(
      {
        name: "My product",
        taxPercentage: "5"
      },
    )
    const orderId = placeOrder({items: [{productName: "My product", quantity: 3}]}).getJson().orderId;
    approveOrder({orderId})
    shipOrder({orderId})
    const response = shipOrder({orderId})
    expect(response.getStatus()).toBe(400);
    expect(response.getJson()).toStrictEqual({message: 'Order cannot be shipped twice'});
  })
  test('approve after shipment', () => {
    addProduct(
      {
        name: "My product",
        taxPercentage: "5"
      },
    )
    const orderId = placeOrder({items: [{productName: "My product", quantity: 3}]}).getJson().orderId;
    approveOrder({orderId})
    shipOrder({orderId})
    const response = approveOrder({orderId})
    expect(response.getStatus()).toBe(400);
    expect(response.getJson()).toStrictEqual({message: 'shipped orders cannot be changed'});
  })
  test('reject after shipment', () => {
    addProduct(
      {
        name: "My product",
        taxPercentage: "5"
      },
    )
    const orderId = placeOrder({items: [{productName: "My product", quantity: 3}]}).getJson().orderId;
    approveOrder({orderId})
    shipOrder({orderId})
    const response = rejectOrder({orderId})
    expect(response.getStatus()).toBe(400);
    expect(response.getJson()).toStrictEqual({message: 'shipped orders cannot be changed'});
  })
  test('invoice on non shipped order', () => {
    addProduct(
      {
        name: "My product",
        taxPercentage: "10",
        price: "10.00"
      },
    )
    const orderId = placeOrder({items: [{productName: "My product", quantity: 3}]}).getJson().orderId;
    approveOrder({orderId})
    
    const response = getInvoice({orderId})
    expect(response.getStatus()).toBe(400);
    expect(response.getJson()).toStrictEqual({
      message: 'Order is not shipped'
    });
  })
  test('invoice on non existing order', () => {
    const response = getInvoice({orderId: 1})
    expect(response.getStatus()).toBe(404);
    expect(response.getJson()).toStrictEqual({
      message: 'Order not found'
    });
  })
  test('invoice', () => {
    addProduct(
      {
        name: "My product",
        taxPercentage: "10",
        price: "10.00"
      },
    )
    const orderId = placeOrder({items: [{productName: "My product", quantity: 3}]}).getJson().orderId;
    approveOrder({orderId})
    shipOrder({orderId})
    const response = getInvoice({orderId})
    expect(response.getStatus()).toBe(200);
    expect(response.getJson()).toStrictEqual({
      products: [{name: "My product", quantity: 3}],
      total: "33.00 EUR",
      totalTax: "3.00 EUR"
    });
  })
  test('invoice with two products', () => {
    addProduct(
      {
        name: "Banana",
        taxPercentage: "10",
        price: "9.00"
      }
    )
    addProduct(
      {
        name: "Apple",
        taxPercentage: "20",
        price: "12.50"
      }
    )
    const orderId = placeOrder({items: [{productName: "Banana", quantity: 1}, {productName: "Apple", quantity: 2}]}).getJson().orderId;
    approveOrder({orderId})
    shipOrder({orderId})
    const response = getInvoice({orderId})
    expect(response.getStatus()).toBe(200);
    expect(response.getJson()).toStrictEqual({
      products: [{name: "Banana", quantity: 1}, {name: "Apple", quantity: 2}],
      total: "39.90 EUR",
      totalTax: "5.90 EUR"
    });
  })
});

