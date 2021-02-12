import * as DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';

import { VenuesService } from '../venues/venues.service';

@Injectable({ scope: Scope.REQUEST })
export class MenusLoaders {
  constructor (
    private venuesService: VenuesService
  ) {
  }

  public readonly batchVenues = new DataLoader(async (masterIds: number[]) => {
    const masters = await this.venuesService.getByIds(masterIds);
    const mastersMap = new Map(masters.map(item => [item.id, item]));
    return masterIds.map(authorId => mastersMap.get(authorId));
  })
}
