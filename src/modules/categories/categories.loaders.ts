import * as DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';

import { MenusService } from '../menus/menus.service';

@Injectable({ scope: Scope.REQUEST })
export class CategoriesLoaders {
  constructor (
    private venuesService: MenusService
  ) {
  }

  public readonly batchVenues = new DataLoader(async (masterIds: number[]) => {
    const masters = await this.venuesService.getByIds(masterIds);
    const mastersMap = new Map(masters.map(item => [item.id, item]));
    return masterIds.map(authorId => mastersMap.get(authorId));
  })
}
