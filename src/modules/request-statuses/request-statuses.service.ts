import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRequestStatusInput } from './dto/create-request-status.input';
import { UpdateRequestStatusInput } from './dto/update-request-status.input';
import { RequestStatus } from './entities/request-status.entity';

@Injectable()
export class RequestStatusesService {
  constructor (
    @InjectRepository(RequestStatus)
    private readonly RequestStatusRepository: Repository<RequestStatus>
  ) {}

  async create (createRequestStatusInput: CreateRequestStatusInput) {
    const newRequestStatus = this.RequestStatusRepository.create(createRequestStatusInput);
    return await this.RequestStatusRepository.save(newRequestStatus);
  }

  async findAll () {
    return await this.RequestStatusRepository.find();
  }

  async findOne (id: number) {
    const requestStatus = await this.RequestStatusRepository.findOne(id);
    if (!requestStatus) throw new NotFoundException('no hay registro con este id');
    return requestStatus;
  }

  async update (id: number, updateRequestStatusInput: UpdateRequestStatusInput) {
    const requestStatus = await this.findOne(id);

    const editedrequestStatus = this.RequestStatusRepository.merge(requestStatus, updateRequestStatusInput);
    return await this.RequestStatusRepository.save(editedrequestStatus);
  }

  async remove (id: number) {
    const requestStatus = await this.findOne(id);
    return await this.RequestStatusRepository.remove(requestStatus);
  }
}
