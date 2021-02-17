import * as DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';

import { VenuesService } from '../venues/venues.service';
import { PersonsService } from '../persons/persons.service';

@Injectable({ scope: Scope.REQUEST })
export class AssignedVenuesLoaders {
  constructor (
    private venuesService: VenuesService,
    private personsService: PersonsService
  ) {
  }

  public readonly batchVenues = new DataLoader(async (masterIds: number[]) => {
    const masters = await this.venuesService.getByIds(masterIds);
    const mastersMap = new Map(masters.map(item => [item.id, item]));
    return masterIds.map(authorId => mastersMap.get(authorId));
  })

  public readonly batchPersons = new DataLoader(async (masterIds: number[]) => {
    const masters = await this.personsService.getByIds(masterIds);
    const mastersMap = new Map(masters.map(item => [item.id, item]));
    return masterIds.map(authorId => mastersMap.get(authorId));
  })
}
