import * as DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';

import { ProductTypesService } from '../product-types/product-types.service';

@Injectable({ scope: Scope.REQUEST })
export class ProductsLoaders {
  constructor (
    private productTypesService: ProductTypesService
  ) {
  }

  public readonly batchVenues = new DataLoader(async (masterIds: number[]) => {
    const masters = await this.productTypesService.getByIds(masterIds);
    const mastersMap = new Map(masters.map(item => [item.id, item]));
    return masterIds.map(authorId => mastersMap.get(authorId));
  })
}
