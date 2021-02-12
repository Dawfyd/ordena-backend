import * as DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';

import { CompaniesService } from '../companies/companies.service';

@Injectable({ scope: Scope.REQUEST })
export class VenuesLoaders {
  constructor (
    private companiesService: CompaniesService
  ) {
  }

  public readonly batchCompanies = new DataLoader(async (companyIds: number[]) => {
    const companies = await this.companiesService.getByIds(companyIds);
    const companiesMap = new Map(companies.map(user => [user.id, user]));
    return companyIds.map(authorId => companiesMap.get(authorId));
  })
}
