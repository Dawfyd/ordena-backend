import * as DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { RequestsService } from '../requests/requests.service';

@Injectable({ scope: Scope.REQUEST })
export class AdditionalsPerRequestLoaders {
  constructor (
        private productsService: ProductsService,
        private requestsService: RequestsService
  ) {}

  public readonly batchRequest = new DataLoader(async (requestIds: number[]) => {
    const request = await this.requestsService.getByIds(requestIds);
    const requestMap = new Map(request.map(user => [user.id, user]));
    return requestIds.map(authorId => requestMap.get(authorId));
  });

  public readonly batchProduct = new DataLoader(async (productIds: number[]) => {
    const product = await this.productsService.getByIds(productIds);
    const productMap = new Map(product.map(user => [user.id, user]));
    return productIds.map(authorId => productMap.get(authorId));
  });
}
