import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceInput } from './dto/create-service.input';
import { UpdateServiceInput } from './dto/update-service.input';
import { Service } from './entities/service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly ServiceRepository: Repository<Service>,
  ) {}

  async create(createServiceInput: CreateServiceInput): Promise<Service> {
    const newService = this.ServiceRepository.create(createServiceInput);
    return await this.ServiceRepository.save(newService);
  }

  async findAll(): Promise<Service[]> {
    return await this.ServiceRepository.find();
  }

  async findOne(id: number): Promise<Service> {
    const service = await this.ServiceRepository.findOne(id);
    if (!service) throw new NotFoundException('No hay una mesa con esa ID');
    return service;
  }

  async update(id: number, updateServiceInput: UpdateServiceInput) {
    const service = await this.ServiceRepository.findOne(id);
    if (!service) throw new NotFoundException('No hay una mesa con esa ID');

    const editedService = Object.assign(Service, updateServiceInput);
    return await this.ServiceRepository.save(editedService);
  }

  async remove(id: number) {
    const service = await this.ServiceRepository.findOne(id);
    if (!service) throw new NotFoundException('No hay una mesa con esa ID');
    return await this.ServiceRepository.remove(service);
  }
}