import * as DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { PersonsService } from '../persons/persons.service';
import { SpotsService } from '../spots/spots.service';

@Injectable({ scope: Scope.REQUEST })
export class WaiterAssignedSpotsLoaders {
  constructor (
    private readonly personsService: PersonsService,
    private readonly spotsService: SpotsService
  ) {
  }

  public readonly batchPersons = new DataLoader(async (masterIds: number[]) => {
    const masters = await this.personsService.getByIds(masterIds);
    const mastersMap = new Map(masters.map(item => [item.id, item]));
    return masterIds.map(authorId => mastersMap.get(authorId));
  })

  public readonly batchSpots = new DataLoader(async (masterIds: number[]) => {
    const masters = await this.spotsService.getByIds(masterIds);
    const mastersMap = new Map(masters.map(item => [item.id, item]));
    return masterIds.map(authorId => mastersMap.get(authorId));
  })
}
