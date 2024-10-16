import { AddProductController } from "../adapters/AddProductController";
import { OrderPlacementController } from "../adapters/OrderPlacementController";
import { OrderApprovalController } from "../adapters/OrderApprovalController";
import { OrderRejectionController } from "../adapters/OrderRejectionController";
import { OrderShipmentController } from "../adapters/OrderShipmentController";

import { OrderRepositoryInMemory } from "../adapters/OrderRepositoryInMemory";
import { ProductCatalogInMemory } from "../adapters/ProductCatalogInMemory";
import { InvoiceController } from "../adapters/InvoiceController";
import { AddProductUseCase } from "../interaction/AddProductUseCase";
import { InvoiceUseCase } from "../interaction/InvoiceUseCase";
import { OrderStatusUseCase } from "../interaction/OrderStatusUseCase";
import { ExpressController } from "../outer/ExpressController";
import { OrderPlacementUseCase } from "../interaction/OderPlacementUseCase";

function orderPlacementController() {
    return new ExpressController(
        new OrderPlacementController(
          new OrderPlacementUseCase(
            new OrderRepositoryInMemory(),
            new ProductCatalogInMemory()
            )
          )
        );
}

function addProductController() {
    return new ExpressController(
        new AddProductController(
        new AddProductUseCase(new ProductCatalogInMemory())
        )
      )
}

function orderApprovalController() {
    return new ExpressController(new OrderApprovalController(
        new OrderStatusUseCase(new OrderRepositoryInMemory()))
      )
}

function orderRejectionController() {
    return new ExpressController(new OrderRejectionController(new OrderStatusUseCase(new OrderRepositoryInMemory())));
}

function orderShipmentController() {
    return new ExpressController(new OrderShipmentController(new OrderStatusUseCase(new OrderRepositoryInMemory())));
}

function invoiceController() {
    return new ExpressController(new InvoiceController(new InvoiceUseCase(new OrderRepositoryInMemory())));
}

export { orderPlacementController, addProductController, orderApprovalController, orderRejectionController, orderShipmentController, invoiceController }