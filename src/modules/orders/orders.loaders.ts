import * as DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';

import { OrderStatusesService } from '../order-statuses/order-statuses.service';
import { SpotsService } from '../spots/spots.service';
import { PersonsService } from '../persons/persons.service';

@Injectable({ scope: Scope.REQUEST })
export class OrderLoaders {
  constructor (
        private orderStatusesService: OrderStatusesService,
        private spotsService: SpotsService,
        private personsService: PersonsService
  ) {}

    public readonly batchOrderStatus = new DataLoader(async (orderStatusIds: number[]) => {
      const orderStatus = await this.orderStatusesService.getByIds(orderStatusIds);
      const orderStatusMap = new Map(orderStatus.map(user => [user.id, user]));
      return orderStatusIds.map(authorId => orderStatusMap.get(authorId));
    });

    public readonly batchSpot = new DataLoader(async (spotIds: number[]) => {
      const spot = await this.spotsService.getByIds(spotIds);
      const spotMap = new Map(spot.map(user => [user.id, user]));
      return spotIds.map(authorId => spotMap.get(authorId));
    });

    public readonly batchPerson = new DataLoader(async (personIds: number[]) => {
      const person = await this.personsService.getByIds(personIds);
      const personMap = new Map(person.map(user => [user.id, user]));
      return personIds.map(authorId => personMap.get(authorId));
    });
}
