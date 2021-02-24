import * as DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';

import { ProductsService } from '../products/products.service';

@Injectable({ scope: Scope.REQUEST })
export class ModifiersLoaders {
  constructor (
    private readonly productsService: ProductsService
  ) {
  }

  public readonly batchProducts = new DataLoader(async (masterIds: number[]) => {
    const masters = await this.productsService.getByIds(masterIds);
    const mastersMap = new Map(masters.map(item => [item.id, item]));
    return masterIds.map(authorId => mastersMap.get(authorId));
  })
}
