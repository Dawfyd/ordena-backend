import * as DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';

import { VenuesService } from '../venues/venues.service';
import { ProductsService } from '../products/products.service';

@Injectable({ scope: Scope.REQUEST })
export class ProductsInVenueLoaders {
  constructor (
    private venuesService: VenuesService,
    private productsService: ProductsService
  ) {
  }

  public readonly batchVenues = new DataLoader(async (masterIds: number[]) => {
    const masters = await this.venuesService.getByIds(masterIds);
    const mastersMap = new Map(masters.map(item => [item.id, item]));
    return masterIds.map(authorId => mastersMap.get(authorId));
  })

  public readonly batchProducts = new DataLoader(async (masterIds: number[]) => {
    const masters = await this.productsService.getByIds(masterIds);
    const mastersMap = new Map(masters.map(item => [item.id, item]));
    return masterIds.map(authorId => mastersMap.get(authorId));
  })
}
