import * as DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';

import { CategoriesService } from '../categories/categories.service';
import { ProductsService } from '../products/products.service';

@Injectable({ scope: Scope.REQUEST })
export class AssignedCategoriesLoaders {
  constructor (
    private productsService: ProductsService,
    private categoriesService: CategoriesService
  ) {
  }

  public readonly batchCategories = new DataLoader(async (masterIds: number[]) => {
    const masters = await this.categoriesService.getByIds(masterIds);
    const mastersMap = new Map(masters.map(item => [item.id, item]));
    return masterIds.map(authorId => mastersMap.get(authorId));
  })

  public readonly batchProducts = new DataLoader(async (masterIds: number[]) => {
    const masters = await this.productsService.getByIds(masterIds);
    const mastersMap = new Map(masters.map(item => [item.id, item]));
    return masterIds.map(authorId => mastersMap.get(authorId));
  })
}
