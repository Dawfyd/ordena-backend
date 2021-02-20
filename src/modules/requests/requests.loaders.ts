import * as DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';

import { SpotsService } from '../spots/spots.service';
import { OrdersService } from '../orders/orders.service';
import { ProductsService } from '../products/products.service';
import { RequestStatusesService } from '../request-statuses/request-statuses.service';

@Injectable({ scope: Scope.REQUEST })
export class RequestLoaders {
  constructor (
        private spotsService: SpotsService,
        private ordersService: OrdersService,
        private productsService: ProductsService,
        private requestStatusesService: RequestStatusesService
  ) {}

    public readonly batchSpot = new DataLoader(async (spotIds: number[]) => {
      const spot = await this.spotsService.getByIds(spotIds);
      const spotMap = new Map(spot.map(user => [user.id, user]));
      return spotIds.map(authorId => spotMap.get(authorId));
    });

    public readonly batchOrder = new DataLoader(async (orderIds: number[]) => {
      const order = await this.ordersService.getByIds(orderIds);
      const orderMap = new Map(order.map(user => [user.id, user]));
      return orderIds.map(authorId => orderMap.get(authorId));
    });

    public readonly batchProduct = new DataLoader(async (productIds: number[]) => {
      const product = await this.productsService.getByIds(productIds);
      const productMap = new Map(product.map(user => [user.id, user]));
      return productIds.map(authorId => productMap.get(authorId));
    });

    public readonly batchRequestStatus = new DataLoader(async (requestStatusIds: number[]) => {
      const requestStatus = await this.requestStatusesService.getByIds(requestStatusIds);
      const requestStatusMap = new Map(requestStatus.map(user => [user.id, user]));
      return requestStatusIds.map(authorId => requestStatusMap.get(authorId));
    });
}
