import * as DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';

import { PersonsService } from '../persons/persons.service';

@Injectable({ scope: Scope.REQUEST })
export class PersonsLoaders {
  constructor (
    private personsService: PersonsService
  ) {
  }

  public readonly batchPersons = new DataLoader(async (personIds: number[]) => {
    const persons = await this.personsService.getByIds(personIds);
    const personsMap = new Map(persons.map(person => [person.id, person]));
    return personIds.map(authorId => personsMap.get(authorId));
  })
}
