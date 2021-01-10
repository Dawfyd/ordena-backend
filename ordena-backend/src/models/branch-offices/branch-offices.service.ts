import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBranchOfficeInput } from './dto/create-branch-office.input';
import { UpdateBranchOfficeInput } from './dto/update-branch-office.input';
import { BranchOffice } from './entities/branch-office.entity';

@Injectable()
export class BranchOfficesService {
  constructor(
    @InjectRepository(BranchOffice)
    private readonly BranchOfficeRepository: Repository<BranchOffice>,
  ) {}

  async create(
    createBranchOfficeInput: CreateBranchOfficeInput,
  ): Promise<BranchOffice> {
    const newBranchOffice = this.BranchOfficeRepository.create(
      createBranchOfficeInput,
    );
    return await this.BranchOfficeRepository.save(newBranchOffice);
  }

  async findAll(): Promise<BranchOffice[]> {
    return await this.BranchOfficeRepository.find();
  }

  async findOne(id: number): Promise<BranchOffice> {
    const branch_office = await this.BranchOfficeRepository.findOne(id);
    if (!branch_office)
      throw new NotFoundException('No hay una sede con esa ID');
    return branch_office;
  }

  async update(id: number, updateBranchOfficeInput: UpdateBranchOfficeInput) {
    const branch_office = await this.BranchOfficeRepository.findOne(id);
    if (!branch_office)
      throw new NotFoundException('No hay una sede con esa ID');

    const editedBranchOffice = Object.assign(
      branch_office,
      updateBranchOfficeInput,
    );
    return await this.BranchOfficeRepository.save(editedBranchOffice);
  }

  async remove(id: number) {
    const branch_office = await this.BranchOfficeRepository.findOne(id);
    if (!branch_office)
      throw new NotFoundException('No hay una sede con esa ID');
    return await this.BranchOfficeRepository.remove(branch_office);
  }
}
