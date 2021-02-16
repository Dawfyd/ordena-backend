import * as DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';

import { PersonsService } from '../persons/persons.service';
import { ProductsService } from '../products/products.service';

@Injectable({ scope: Scope.REQUEST })
export class FavoritesLoaders {
  constructor (
    private personsService: PersonsService,
    private productsService: ProductsService
  ) {
  }

  public readonly batchPersons = new DataLoader(async (masterIds: number[]) => {
    const masters = await this.personsService.getByIds(masterIds);
    const mastersMap = new Map(masters.map(item => [item.id, item]));
    return masterIds.map(authorId => mastersMap.get(authorId));
  })

  public readonly batchProducts = new DataLoader(async (masterIds: number[]) => {
    const masters = await this.productsService.getByIds(masterIds);
    const mastersMap = new Map(masters.map(item => [item.id, item]));
    return masterIds.map(authorId => mastersMap.get(authorId));
  })
}
