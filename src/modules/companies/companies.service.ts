import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { generateUuid } from 'src/utils';
import { Company } from './entities/company.entity';
import { Venue } from '../venues/entities/venue.entity';

import { CreateCompanyInput } from './dto/create-company-input.dto';
import { UpdateCompanyInput } from './dto/update-company-input.dto';
import { FindAllCompaniesInput } from './dto/find-all-companies-input.dto';
import { FindOneCompanyInput } from './dto/find-one-company-input.dto';
@Injectable()
export class CompaniesService {
  constructor (
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>
  ) {}

  /* CRUD RELATED OPERATIONS */

  public async create (createCompanyInput: CreateCompanyInput): Promise<Company> {
    const created = this.companyRepository.create({
      ...createCompanyInput,
      uuid: generateUuid()
    });

    const saved = await this.companyRepository.save(created);

    return saved;
  }

  public async findAll (findAllCompaniesInput: FindAllCompaniesInput): Promise<Company[]> {
    const { limit, skip, search = '' } = findAllCompaniesInput;

    const query = this.companyRepository.createQueryBuilder('c');

    if (search) {
      query.where('c.name ilike :search', { search: `%${search}%` });
    }

    query.limit(limit || undefined)
      .offset(skip || 0)
      .orderBy('c.id', 'DESC');

    const companies = await query.getMany();

    return companies;
  }

  public async findOne (findOneCompanyInput: FindOneCompanyInput): Promise<Company | null> {
    const { companyUuid } = findOneCompanyInput;

    const company = await this.companyRepository.createQueryBuilder('c')
      .where('c.uuid = :companyUuid', { companyUuid })
      .getOne();

    return company || null;
  }

  public async update (findOneCompanyInput: FindOneCompanyInput, updateCompanyInput: UpdateCompanyInput): Promise<Company> {
    const { companyUuid } = findOneCompanyInput;

    const company = await this.findOne({ companyUuid });

    if (!company) {
      throw new NotFoundException(`can't get the company with uuid ${companyUuid}.`);
    }

    const preloaded = await this.companyRepository.preload({
      id: company.id,
      ...updateCompanyInput
    });

    const saved = await this.companyRepository.save(preloaded);

    return saved;
  }

  public async remove (findOneCompanyInput: FindOneCompanyInput): Promise<Company> {
    const { companyUuid } = findOneCompanyInput;

    const existing = await this.findOne({ companyUuid });

    if (!existing) {
      throw new NotFoundException(`can't get the company with uuid ${companyUuid}.`);
    }

    const clone = { ...existing };

    await this.companyRepository.remove(existing);

    return clone;
  }

  /* CRUD RELATED OPERATIONS */

  /* OPERATIONS BECAUSE OF THE MASTER STATUS */

  public async getByIds (ids: number[]): Promise<Company[]> {
    return this.companyRepository.findByIds(ids);
  }

  /* OPERATIONS BECAUSE OF THE MASTER STATUS */

  /* OPERATIONS BECAUSE OF ONE TO MANY RELATIONS */

  public async venues (company: Company): Promise<Venue[]> {
    const { id } = company;

    const item = await this.companyRepository.createQueryBuilder('c')
      .leftJoinAndSelect('c.venues', 'v')
      .where('c.id = :id', { id })
      .getOne();

    return item ? item.venues : [];
  }

  /* OPERATIONS BECAUSE OF ONE TO MANY RELATIONS */
}
