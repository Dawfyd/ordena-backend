import * as DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { ModifiersService } from '../modifiers/modifiers.service';
import { RequestsService } from '../requests/requests.service';

@Injectable({ scope: Scope.REQUEST })
export class ModifiersPerRequestLoaders {
  constructor (
    private readonly modifiersService: ModifiersService,
    private readonly requestsService: RequestsService
  ) {
  }

  public readonly batchModifiers = new DataLoader(async (masterIds: number[]) => {
    const masters = await this.modifiersService.getByIds(masterIds);
    const mastersMap = new Map(masters.map(item => [item.id, item]));
    return masterIds.map(authorId => mastersMap.get(authorId));
  })

  public readonly batchRequests= new DataLoader(async (masterIds: number[]) => {
    const masters = await this.requestsService.getByIds(masterIds);
    const mastersMap = new Map(masters.map(item => [item.id, item]));
    return masterIds.map(authorId => mastersMap.get(authorId));
  })
}
