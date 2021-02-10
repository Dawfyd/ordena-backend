import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyInput } from './dto/create-company.input';
import { UpdateCompanyInput } from './dto/update-company.input';
import { Company } from './entities/company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly CompanyRepository: Repository<Company>,
  ) {}

  async create(createCompanyInput: CreateCompanyInput): Promise<Company> {
    const newCompany = this.CompanyRepository.create(createCompanyInput);
    return await this.CompanyRepository.save(newCompany);
  }

  async findAll(): Promise<Company[]> {
    return await this.CompanyRepository.find();
  }

  async findOne(id: number): Promise<Company> {
    const company = await this.CompanyRepository.findOne(id);
    if (!company) throw new NotFoundException('No hay un cliente con esa ID');
    return company;
  }

  async update(id: number, updateCompanyInput: UpdateCompanyInput): Promise<Company> {
    const company = await this.findOne(id);

    const editedCompany = this.CompanyRepository.merge(company, updateCompanyInput);
    return await this.CompanyRepository.save(editedCompany);
  }

  async remove(id: number): Promise<Company> {
    const company = await this.findOne(id);
    return await this.CompanyRepository.remove(company);
  }
}
