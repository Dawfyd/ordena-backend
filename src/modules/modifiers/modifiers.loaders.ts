import * as DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';

import { ProductsService } from '../products/products.service';
import { ModifierTypesService } from '../modifier-types/modifier-types.service';

@Injectable({ scope: Scope.REQUEST })
export class ModifiersLoaders {
  constructor (
    private readonly productsService: ProductsService,
    private readonly modifierTypesService: ModifierTypesService
  ) {
  }

  public readonly batchProducts = new DataLoader(async (masterIds: number[]) => {
    const masters = await this.productsService.getByIds(masterIds);
    const mastersMap = new Map(masters.map(item => [item.id, item]));
    return masterIds.map(authorId => mastersMap.get(authorId));
  })

  public readonly batchModifierTypes = new DataLoader(async (masterIds: number[]) => {
    const masters = await this.modifierTypesService.getByIds(masterIds);
    const mastersMap = new Map(masters.map(item => [item.id, item]));
    return masterIds.map(authorId => mastersMap.get(authorId));
  })
}
