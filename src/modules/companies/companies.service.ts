import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { generateUuid } from 'src/utils';
import { Company } from './entities/company.entity';
import { Venue } from '../venues/entities/venue.entity';

import { CreateInput } from './dto/create-input.dto';
import { UpdateCompanyInput } from './dto/update-company-input.dto';
import { FindAllInput } from './dto/find-all-input.dto';
import { FindOneInput } from './dto/find-one-input.dto';
@Injectable()
export class CompaniesService {
  constructor (
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>
  ) {}

  public async create (createCompanyInput: CreateInput): Promise<Company> {
    const created = this.companyRepository.create({
      ...createCompanyInput,
      uuid: generateUuid()
    });

    const saved = await this.companyRepository.save(created);

    return saved;
  }

  public async findAll (findAllInput: FindAllInput): Promise<Company[]> {
    const { limit, skip, search = '' } = findAllInput;

    const query = this.companyRepository.createQueryBuilder('c');

    if (search) {
      query.where('c.name ilike :search', { search: `%${search}%` });
    }

    query.limit(limit || undefined)
      .offset(skip || 0);

    const companies = await query.getMany();

    return companies;
  }

  public async findOne (findOneInput: FindOneInput): Promise<Company | null> {
    const { companyUuid } = findOneInput;

    const company = await this.companyRepository.createQueryBuilder('c')
      .where('c.uuid = :companyUuid', { companyUuid })
      .getOne();

    return company || null;
  }

  public async update (findOneInput: FindOneInput, updateCompanyInput: UpdateCompanyInput): Promise<Company> {
    const { companyUuid } = findOneInput;

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

  public async remove (findOneInput: FindOneInput): Promise<Company> {
    const { companyUuid } = findOneInput;

    const existing = await this.findOne({ companyUuid });

    if (!existing) {
      throw new NotFoundException(`can't get the company with uuid ${companyUuid}.`);
    }

    const removed = await this.companyRepository.remove(existing);

    return removed;
  }

  public async venues (company: Company): Promise<Venue[]> {
    const { id } = company;

    const item = await this.companyRepository.createQueryBuilder('c')
      .leftJoinAndSelect('c.venues', 'v')
      .where('c.id = :id', { id })
      .getOne();

    return item.venues;
  }
}
