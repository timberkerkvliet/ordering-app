import { AddProductController } from "./controllers/AddProductController";
import { OrderPlacementController } from "./controllers/OrderPlacementController";
import { OrderApprovalController } from "./controllers/OrderApprovalController";
import { OrderRejectionController } from "./controllers/OrderRejectionController";

import { Request, Response} from "express";

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
  new AddProductController().handle({body} as unknown as Request, res as unknown as Response)
  return res;
}

function placeOrder(body: any): FakeResponse {
  const res = new FakeResponse();
  new OrderPlacementController().handle({body} as unknown as Request, res as unknown as Response)
  return res;
}

function approveOrder(body: any): FakeResponse {
  const res = new FakeResponse();
  new OrderApprovalController().handle({body} as unknown as Request, res as unknown as Response)
  return res;
}

function rejectOrder(body: any): FakeResponse {
  const res = new FakeResponse();
  new OrderRejectionController().handle({body} as unknown as Request, res as unknown as Response)
  return res;
}

describe('Tests', () => {
  test('non placing non existing product', () => {
    expect(placeOrder({items: [{name: "Does not exist", quantity: 1}]}).getStatus()).toBe(404);
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
});

