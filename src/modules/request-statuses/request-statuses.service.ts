import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RequestStatus } from './entities/request-status.entity';

import { CreateRequestStatusInput } from './dto/create-request-status.input.dto';
import { UpdateRequestStatusInput } from './dto/update-request-status.input.dto';
import { FindAllRequestStatusesInput } from './dto/find-all-request-statuses.input.dto';
import { FindOneRequestStatusInput } from './dto/find-one-request-status.input.dto';

@Injectable()
export class RequestStatusesService {
  constructor (
    @InjectRepository(RequestStatus)
    private readonly RequestStatusRepository: Repository<RequestStatus>
  ) {}

  public async create (createRequestStatusInput: CreateRequestStatusInput): Promise<RequestStatus> {
    const created = this.RequestStatusRepository.create(createRequestStatusInput);
    const saved = await this.RequestStatusRepository.save(created);
    return saved;
  }

  public async findAll (findAllRequestStatusesInput: FindAllRequestStatusesInput): Promise<RequestStatus[]> {
    const { limit, skip, search = '' } = findAllRequestStatusesInput;

    const query = this.RequestStatusRepository.createQueryBuilder('rs');

    if (search) {
      query.where('rs.name ilike :search', { search: `%${search}%` });
    }

    query.limit(limit || undefined)
      .offset(skip || 0)
      .orderBy('rs.id', 'DESC');

    const requestStatus = await query.getMany();

    return requestStatus;
  }

  public async findOne (findOneRequestStatus: FindOneRequestStatusInput): Promise<RequestStatus | null> {
    const { id } = findOneRequestStatus;

    const requestStatus = await this.RequestStatusRepository.createQueryBuilder('rs')
      .where('rs.id = :id', { id })
      .getOne();

    return requestStatus || null;
  }

  public async update (findOneRequestStatusInput: FindOneRequestStatusInput, updateRequestStatusInput: UpdateRequestStatusInput): Promise<RequestStatus> {
    const { id } = findOneRequestStatusInput;
    const requestStatus = await this.findOne({ id });

    if (!requestStatus) {
      throw new NotFoundException(`can't get the requestStatu with id ${id}.`);
    }

    const preloaded = await this.RequestStatusRepository.preload({
      id: requestStatus.id,
      ...updateRequestStatusInput
    });

    const saved = await this.RequestStatusRepository.save(preloaded);
    return saved;
  }

  public async remove (findOneRequestStatusInput: FindOneRequestStatusInput): Promise<RequestStatus> {
    const { id } = findOneRequestStatusInput;
    const existing = await this.findOne({ id });

    if (!existing) {
      throw new NotFoundException(`can't get the requestStatu with id ${id}.`);
    }

    const clone = { ...existing };

    await this.RequestStatusRepository.remove(existing);

    return clone;
  }

  public async getByIds (ids: number[]): Promise<RequestStatus[]> {
    return this.RequestStatusRepository.findByIds(ids, {
      loadRelationIds: true
    });
  }

  public async requests (requestStatus: RequestStatus): Promise<any[]> {
    const { id } = requestStatus;

    const item = await this.RequestStatusRepository.createQueryBuilder('rs')
      .leftJoinAndSelect('rs.requests', 'r')
      .where('rs.id = :id', { id })
      .getOne();

    const items = item ? item.requests : [];

    return items.map(item => ({ ...item, requestStatus: item.id }));
  }
}
