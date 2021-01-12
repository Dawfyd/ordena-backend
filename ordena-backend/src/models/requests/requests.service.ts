import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRequestInput } from './dto/create-request.input';
import { UpdateRequestInput } from './dto/update-request.input';
import { Request } from './entities/request.entity';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private readonly RequestRepository: Repository<Request>,
  ) {}

  async create(
    createRequestInput: CreateRequestInput,
  ): Promise<Request> {
    const newRequest = this.RequestRepository.create(
      createRequestInput,
    );
    return await this.RequestRepository.save(newRequest);
  }

  async findAll(): Promise<Request[]> {
    return await this.RequestRepository.find();
  }

  async findOne(id: number): Promise<Request> {
    const request = await this.RequestRepository.findOne(id);
    if (!request)
      throw new NotFoundException('No hay un producto ordenado con esa ID');
    return request;
  }

  async update(
    id: number,
    updateRequestInput: UpdateRequestInput,
  ) {
    const request = await this.RequestRepository.findOne(id);
    if (!request)
      throw new NotFoundException('No hay un producto ordenado con esa ID');

    const editedRequest = Object.assign(
      request,
      updateRequestInput,
    );
    return await this.RequestRepository.save(editedRequest);
  }

  async remove(id: number) {
    const request = await this.RequestRepository.findOne(id);
    if (!request)
      throw new NotFoundException('No hay un producto ordenado con esa ID');
    return await this.RequestRepository.remove(request);
  }
}
